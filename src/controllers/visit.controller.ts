import { Controller, Get, HttpException, HttpStatus, Inject, Post, Request } from "@nestjs/common";
import { Request as HttpRequest } from "express";
import { BulkVisitRequestDto, GetVisitRequestDto } from "src/contracts/dtos";
import { bulkVisitRequestSchema, getVisitRequestSchema } from "src/contracts/schemas";
import { IVisitService } from "src/services/visit.service.interface";
import { API_PARAMS, API_V1 } from "src/utilities/consts";
import { extractOrganizationIdFromRequest } from "src/utilities/helpers";

@Controller(`${API_V1}/visit`)
export class VisitController {
    constructor(@Inject(IVisitService) private readonly visitService:IVisitService) {}

    @Get()
    async getVisits(@Request() req: HttpRequest){
        const offset = Number(req.query[API_PARAMS.OFFSET]);
        const limit = Number(req.query[API_PARAMS.LIMIT]);

        const organization_id = extractOrganizationIdFromRequest(req);
        const request: GetVisitRequestDto = {
            offset,
            limit,
            organization_id
        };

        const zodResult = getVisitRequestSchema.safeParse(request);
        if(!zodResult.success)
            throw new HttpException(zodResult.error, HttpStatus.BAD_REQUEST);

        return await this.visitService.getVisits(request);
    }

    @Post()
    async bulkInsertVisits(@Request() req: HttpRequest){
        console.log("trying to insert visits")
        const visits = req.body;
        const organization_id = extractOrganizationIdFromRequest(req);
        const request: BulkVisitRequestDto = {
            organization_id,
            visits
        };
        const zodResult = bulkVisitRequestSchema.safeParse(request)
        if(!zodResult.success)
            throw new HttpException(zodResult.error, HttpStatus.BAD_REQUEST);
        return await this.visitService.bulkInsertVisits(zodResult.data);
    }
}