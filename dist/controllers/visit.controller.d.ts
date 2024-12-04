import { Request as HttpRequest } from "express";
import { InsertManyResult, Document } from "mongodb";
import { IVisitService } from "src/services/visit.service.interface";
export declare class VisitController {
    private readonly visitService;
    constructor(visitService: IVisitService);
    getVisits(req: HttpRequest): Promise<import("src/contracts/dtos").PaginatedResult<import("src/contracts/dtos").GetVisitResponseDto>>;
    bulkInsertVisits(req: HttpRequest): Promise<InsertManyResult<Document>>;
}
