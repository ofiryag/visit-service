import { Controller, Get, HttpException, HttpStatus, Inject, Post, Request } from "@nestjs/common";
import { Request as HttpRequest } from "express";
import { InsertManyResult,Document } from "mongodb";
import { BulkVisitRequestDto, GetVisitRequestDto } from "src/contracts/dtos";
import { bulkVisitRequestSchema, getVisitRequestSchema } from "src/contracts/schemas";
import { IVisitService } from "src/services/visit.service.interface";
import { API_V1 } from "src/utilities/consts";
import { extractOrganizationIdFromRequest } from "src/utilities/helpers";
import { parsePaginationQueryParams } from "src/utilities/pagination";

@Controller(`${API_V1}/visit`)
export class VisitController {
    constructor(@Inject(IVisitService) private readonly visitService:IVisitService) {}
    
    /**
    * Fetches the user's visits from db.
    * @param HttpRequest Contains the organization_id and pagination query params - offset and limit.
    * @returns A success message if the visits are successfully fetched.
    * @throws BadRequestException if the request was invalid.
    */
    @Get()
    async getVisits(@Request() req: HttpRequest){
        const organization_id = extractOrganizationIdFromRequest(req);
        const {offset,limit } = parsePaginationQueryParams(req);

        console.log(`trying to get visits for organization id ${organization_id}`)
        const request: GetVisitRequestDto = {offset,limit,organization_id};

        const zodResult = getVisitRequestSchema.safeParse(request);
        if(!zodResult.success)
        {
            console.log(`failed to get visits for organization id ${organization_id}, error:`, zodResult.error)
            throw new HttpException(zodResult.error, HttpStatus.BAD_REQUEST);
        }


        const result = await this.visitService.getVisits(request);
        console.log(`successfully got visits for organization id ${request.organization_id}`)
        return result;

    }

    /**
    * Document the user's visits in a database.
    * @param BulkVisitRequestDto The DTO containing the visit data.
    * @returns A success message if the visits are successfully created.
    * @throws BadRequestException if the request was invalid.
    */
    @Post()
    async bulkInsertVisits(@Request() req: HttpRequest){
        const organization_id = extractOrganizationIdFromRequest(req);
        console.log(`trying to insert visits for organization id ${organization_id}`)

        const visits = req.body;
        const request: BulkVisitRequestDto = {organization_id, visits};

        const zodResult = bulkVisitRequestSchema.safeParse(request)
        if(!zodResult.success)
        {
            console.log(`failed to insert visits for organization id ${organization_id}, error:`, zodResult.error)
            throw new HttpException(zodResult.error, HttpStatus.BAD_REQUEST);
        }

        const result = await this.visitService.bulkInsertVisits(zodResult.data) as InsertManyResult<Document>;
        console.log(`successfully inserted ${result.insertedCount} visits for organization id ${organization_id}`)
        return result;
    }
}