import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { IVisitRepository } from "./visit.repository.interface";
import { GetVisitResponseDto, GetVisitRequestDto, BulkVisitRequestDto } from "src/contracts/dtos";
import { IDbRepository } from "./db.repository.interface";
import { InsertManyResult, MongoClient } from 'mongodb';
import { MONGO } from "src/utilities/consts";

@Injectable()
export class MongoVisitRepository implements IVisitRepository {
    constructor(@Inject(IDbRepository) private readonly dbRepository:IDbRepository<MongoClient>) {}

      async getVisits(request: GetVisitRequestDto): Promise<GetVisitResponseDto[]> {
        try {
          const dbClient = await this.dbRepository.connectToDatabase()
          const orgDb = dbClient.db(`org_${request.organization_id}`);
          const visitsCollection = orgDb.collection(MONGO.COLLECTIONS.VISITS);

          const visitAggregation = [];
          if(request.limit && request.offset)
            visitAggregation.push(...buildPaginationStages(request));

          visitAggregation.push({
            $project: {
              _id: 0
            }
          });

        const documents = await visitsCollection.aggregate(visitAggregation).toArray();
        return documents as GetVisitResponseDto[];
        } catch (error) {
            console.log(`failed to get visits from mongoDB for organization_id ${request.organization_id}, error: ${error}` )
            throw new HttpException(`failed to get visits for organization_id ${request.organization_id}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
      }
      async bulkInsertVisits(request: BulkVisitRequestDto): Promise<InsertManyResult<Document>> {
        try {
          const dbClient = await this.dbRepository.connectToDatabase()
          const orgDb = dbClient.db(`org_${request.organization_id}`);
          const visitsCollection = orgDb.collection(MONGO.COLLECTIONS.VISITS);

          const result = await visitsCollection.insertMany(request.visits);
          return result;
        } catch (error) {
            console.log(`failed to insert visits to mongoDB for organization_id ${request.organization_id}, error: ${error}`)
            throw new HttpException(`failed to insert visits for organization_id ${request.organization_id}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
      }
}

const buildPaginationStages = (request: GetVisitRequestDto) => {
  return [
    {
      $skip: (request.limit * request.offset)
    },
    {
      $limit: request.limit
    }
  ]
}