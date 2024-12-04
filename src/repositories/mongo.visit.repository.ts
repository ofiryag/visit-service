import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { IVisitRepository } from "./visit.repository.interface";
import { GetVisitResponseDto, GetVisitRequestDto, BulkVisitRequestDto, PaginatedResult } from "src/contracts/dtos";
import { IDbRepository } from "./db.repository.interface";
import { InsertManyResult, MongoClient,Document } from 'mongodb';
import { MONGO } from "src/utilities/consts";

@Injectable()
export class MongoVisitRepository implements IVisitRepository {
    constructor(@Inject(IDbRepository) private readonly dbRepository:IDbRepository<MongoClient>) {}

      async getVisits(request: GetVisitRequestDto): Promise<PaginatedResult<GetVisitResponseDto>> {
        try {
          const dbClient = await this.dbRepository.connectToDbClient()
          const orgDb = dbClient.db(`org_${request.organization_id}`);
          const visitsCollection = orgDb.collection(MONGO.COLLECTIONS.VISITS);

          const visitAggregation = [];
          visitAggregation.push(...buildPaginationStages(request));

          const documents = await visitsCollection.aggregate(visitAggregation).toArray();
          const result =  documents.at(0);
          return result as PaginatedResult<GetVisitResponseDto>;
        } catch (error) {
            console.error(`failed to get visits from mongoDB for organization_id ${request.organization_id}, error:`,error )
            throw new HttpException(`failed to get visits for organization_id ${request.organization_id}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
      }

      async bulkInsertVisits(request: BulkVisitRequestDto): Promise<InsertManyResult<Document>> {
        try {
          const dbClient = await this.dbRepository.connectToDbClient()
          const orgDb = dbClient.db(`org_${request.organization_id}`);
          const visitsCollection = orgDb.collection(MONGO.COLLECTIONS.VISITS);

          const result = await visitsCollection.insertMany(request.visits);
          return result;
        } catch (error) {
            console.error(`failed to insert visits to mongoDB for organization_id ${request.organization_id}, error: ${error}`)
            throw new HttpException(`failed to insert visits for organization_id ${request.organization_id}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
      }
}

const buildPaginationStages = (request: GetVisitRequestDto): Document[] => {
  return [
    {
      $project: {
        _id: 0
      }
    },
    {
      $facet: {
        data: [
          {
            $skip: request.limit * request.offset
          },
          {
            $limit: request.limit
          }
        ],
        totalCount: [
          {
            $count: "count"
          }
        ]
      }
    },
    {
      $set: {
        totalCount: {
          $first: "$totalCount.count"
        }
      }
    },
    {
      $set: {
        totalPages: {
          $ifNull: [
            {
              $ceil: {
                $divide: ["$totalCount", 5]
              }
            },
            0
          ]
        },
        totalCount: { $ifNull: ["$totalCount", 0] }
      }
    }
  ]
}