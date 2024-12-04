import { IVisitService } from "./visit.service.interface";
import { BulkVisitRequestDto, GetVisitRequestDto, GetVisitResponseDto, PaginatedResult } from "src/contracts/dtos";
import { IVisitRepository } from "src/repositories/visit.repository.interface";
import { InsertManyResult } from "mongodb";
export declare class VisitService implements IVisitService {
    private readonly visitRepository;
    constructor(visitRepository: IVisitRepository);
    getVisits(request: GetVisitRequestDto): Promise<PaginatedResult<GetVisitResponseDto>>;
    bulkInsertVisits(request: BulkVisitRequestDto): Promise<InsertManyResult<Document>>;
}
