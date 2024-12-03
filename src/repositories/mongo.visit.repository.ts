import { Inject, Injectable } from "@nestjs/common";
import { IVisitRepository } from "./visit.repository.interface";
import { GetVisitResponseDto, GetVisitRequestDto, BulkVisitRequestDto } from "src/contracts/dtos";
import { IDbRepository } from "./db.repository.interface";
import { MongoClient } from 'mongodb';
import { MONGO } from "src/utilities/consts";

@Injectable()
export class MongoVisitRepository implements IVisitRepository {
    constructor(@Inject(IDbRepository) private readonly dbRepository:IDbRepository<MongoClient>) {}

      async getVisits(request: GetVisitRequestDto): Promise<GetVisitResponseDto[]> {
        const dbClient = await this.dbRepository.connectToDatabase()
        const orgDb = dbClient.db(`org_${request.organization_id}`);
        console.log(orgDb.databaseName);
        const visitsCollection = orgDb.collection(MONGO.COLLECTIONS.VISITS);
        console.log(visitsCollection.collectionName);
        const documents = await visitsCollection.find({}).project({"_id":0}).toArray();
        console.log(documents);
        return documents as GetVisitResponseDto[];
      }
      async bulkInsertVisits(request: BulkVisitRequestDto): Promise<void> {
        try {
          const dbClient = await this.dbRepository.connectToDatabase()
          const orgDb = dbClient.db(`org_${request.organization_id}`);
          console.log(orgDb.databaseName);
          const visitsCollection = orgDb.collection(MONGO.COLLECTIONS.VISITS);
          visitsCollection.collectionName;
          console.log(visitsCollection.collectionName);
          console.log(request.visits)
          const documents = await visitsCollection.insertMany(request.visits);
          console.log(documents);
          return;
        } catch (error) {
          console.log(error)
        }
      }
    
}