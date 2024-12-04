import { GetVisitResponseDto, GetVisitRequestDto, BulkVisitRequestDto, PaginatedResult } from "src/contracts/dtos";

export interface IVisitRepository {
    getVisits : (request:GetVisitRequestDto) => Promise<PaginatedResult<GetVisitResponseDto>>;
    bulkInsertVisits : (request:BulkVisitRequestDto) => Promise<any>;
}

export const IVisitRepository = Symbol('IVisitRepository');