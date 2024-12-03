import { GetVisitResponseDto, GetVisitRequestDto, BulkVisitRequestDto } from "src/contracts/dtos";
export interface IVisitRepository {
    getVisits: (request: GetVisitRequestDto) => Promise<GetVisitResponseDto[]>;
    bulkInsertVisits: (request: BulkVisitRequestDto) => Promise<any>;
}
export declare const IVisitRepository: unique symbol;
