import { GetVisitResponseDto, GetVisitRequestDto, BulkVisitRequestDto, PaginatedResult, BulkResult, PostVisitRequestDto } from "src/contracts/dtos";

export interface IVisitService {
    getVisits : (request:GetVisitRequestDto) => Promise<PaginatedResult<GetVisitResponseDto>>;
    bulkInsertVisits : (request:BulkVisitRequestDto) => Promise<BulkResult<PostVisitRequestDto>>;
}

export const IVisitService = Symbol('IVisitService');