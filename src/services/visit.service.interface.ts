import { GetVisitResponseDto, GetVisitRequestDto, BulkVisitRequestDto } from "src/contracts/dtos";

export interface IVisitService {
    getVisits : (request:GetVisitRequestDto) => Promise<GetVisitResponseDto[]>;
    bulkInsertVisits : (request:BulkVisitRequestDto) => Promise<any>;
}

export const IVisitService = Symbol('IVisitService');