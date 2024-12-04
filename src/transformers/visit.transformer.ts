import { HttpException, HttpStatus } from "@nestjs/common";
import { Request } from "express";
import { BulkVisitRequestDto, GetVisitRequestDto } from "src/contracts/dtos";
import { getVisitRequestSchema } from "src/contracts/schemas";
import { extractOrganizationIdFromRequest } from "src/utilities/helpers";
import { parsePaginationQueryParams } from "src/utilities/pagination";

// Transform http request to GetVisitRequestDto
export const transformHttpRequestToGetVisitRequestDto = (req:Request): GetVisitRequestDto=>{
    const organization_id = extractOrganizationIdFromRequest(req);
    const {offset,limit } = parsePaginationQueryParams(req);

    return {offset, limit, organization_id};
}

// Transform http request to BulkVisitRequestDto
export const transformHttpRequestToBulkVisitRequestDto = (req:Request): BulkVisitRequestDto=>{
    const organization_id = extractOrganizationIdFromRequest(req);
    const visits = req.body;

    return {organization_id, visits};
}