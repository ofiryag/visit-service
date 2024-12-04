import { GetVisitResponseDto, GetVisitRequestDto, BulkVisitRequestDto, PaginatedResult } from "src/contracts/dtos";
export interface IVisitService {
    getVisits: (request: GetVisitRequestDto) => Promise<PaginatedResult<GetVisitResponseDto>>;
    bulkInsertVisits: (request: BulkVisitRequestDto) => Promise<any>;
}
export declare const IVisitService: unique symbol;
