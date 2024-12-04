import { IVisitRepository } from "./visit.repository.interface";
import { GetVisitResponseDto, GetVisitRequestDto, BulkVisitRequestDto, PaginatedResult } from "src/contracts/dtos";
import { IDbRepository } from "./db.repository.interface";
import { InsertManyResult, MongoClient, Document } from 'mongodb';
export declare class MongoVisitRepository implements IVisitRepository {
    private readonly dbRepository;
    constructor(dbRepository: IDbRepository<MongoClient>);
    getVisits(request: GetVisitRequestDto): Promise<PaginatedResult<GetVisitResponseDto>>;
    bulkInsertVisits(request: BulkVisitRequestDto): Promise<InsertManyResult<Document>>;
}
