import { IVisitRepository } from "./visit.repository.interface";
import { GetVisitResponseDto, GetVisitRequestDto, BulkVisitRequestDto } from "src/contracts/dtos";
import { IDbRepository } from "./db.repository.interface";
import { InsertManyResult, MongoClient } from 'mongodb';
export declare class MongoVisitRepository implements IVisitRepository {
    private readonly dbRepository;
    constructor(dbRepository: IDbRepository<MongoClient>);
    getVisits(request: GetVisitRequestDto): Promise<GetVisitResponseDto[]>;
    bulkInsertVisits(request: BulkVisitRequestDto): Promise<InsertManyResult<Document>>;
}
