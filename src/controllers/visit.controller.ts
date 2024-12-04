import { Controller, Get, HttpException, HttpStatus, Inject, Post, Request } from "@nestjs/common";
import { Request as HttpRequest } from "express";
import { InsertManyResult,Document } from "mongodb";
import { BulkVisitRequestDto, GetVisitRequestDto } from "src/contracts/dtos";
import { bulkVisitRequestSchema, getVisitRequestSchema } from "src/contracts/schemas";
import { IVisitService } from "src/services/visit.service.interface";
import { transformHttpRequestToBulkVisitRequestDto, transformHttpRequestToGetVisitRequestDto } from "src/transformers/visit.transformer";
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
        const request = transformHttpRequestToGetVisitRequestDto(req)
        console.log(`trying to get visits for organization_id ${request.organization_id}`)

        const zodResult = getVisitRequestSchema.safeParse(request);
        if(!zodResult.success)
        {
            console.error(`failed to get visits for organization_id ${request.organization_id}, error:`, zodResult.error)
            throw new HttpException({message: 'Invalid request parameters.',errors: zodResult.error.errors}, HttpStatus.BAD_REQUEST);    
        }

        const result = await this.visitService.getVisits(request);
        console.log(`successfully got visits for organization_id ${request.organization_id}`)
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
        const request = transformHttpRequestToBulkVisitRequestDto(req)
        console.log(`trying to insert visits for organization_id ${request.organization_id}`)

        const zodResult = bulkVisitRequestSchema.safeParse(request)
        if(!zodResult.success)
        {
            console.error(`failed to insert visits for organization_id ${request.organization_id}, error:`, zodResult.error)
            throw new HttpException({message: 'Invalid request parameters.',errors: zodResult.error.errors}, HttpStatus.BAD_REQUEST);    
        }

        const result = await this.visitService.bulkInsertVisits(zodResult.data) as InsertManyResult<Document>;
        console.log(`successfully inserted ${result.insertedCount} visits for organization_id ${request.organization_id}`)
        return result;
    }
}