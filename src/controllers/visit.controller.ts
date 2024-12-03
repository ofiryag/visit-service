import { Controller, Get, Inject, Post, Request } from "@nestjs/common";
import { Request as HttpRequest } from "express";
import { BulkVisitRequestDto, GetVisitRequestDto } from "src/contracts/dtos";
import { IVisitService } from "src/services/visit.service.interface";
import { API_PARAMS, API_V1 } from "src/utilities/consts";
import { extractOrganizationIdFromRequest } from "src/utilities/helpers";

//ToDo - add validations
@Controller(`${API_V1}/visit`)
export class VisitController {
    constructor(@Inject(IVisitService) private readonly visitService:IVisitService) {}

    @Get()
    async getVisits(@Request() req: HttpRequest){
        const offset = Number(req.params[API_PARAMS.OFFSET]);
        const limit = Number(req.params[API_PARAMS.LIMIT]);
        const organization_id = extractOrganizationIdFromRequest(req);
        const request: GetVisitRequestDto = {
            offset,
            limit,
            organization_id
        };
        return await this.visitService.getVisits(request);
    }

    @Post()
    async bulkInsertVisits(@Request() req: HttpRequest){
        const visits = req.body;
        const organization_id = extractOrganizationIdFromRequest(req);
        const request: BulkVisitRequestDto = {
            organization_id,
            visits
        };
        console.log(request);
        return await this.visitService.bulkInsertVisits(request);
    }
}