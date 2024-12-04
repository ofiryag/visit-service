import { HttpException, HttpStatus } from "@nestjs/common";
import { decodeJwt } from "src/services/jwt.service";
import { isNil} from 'lodash';
import { LLM_WHITELIST, TOKEN_ORG_ID_KEY } from "./consts";
import { Request as HttpRequest } from "express";

/**
* Extracts the organization id from JWT token.
* @param BulkVisitRequestDto The DTO containing the visit data.
* @returns {string} organization_id
* @throws UnauthorizedRequestException if the provided token was invalid.
*/
export const extractOrganizationIdFromRequest = (req: HttpRequest):string =>{
    const token = req.headers["authorization"]?.split(" ").at(1); // Extract token from Authorization header

    if (isNil(token)) {
      throw new HttpException("Unauthorized", HttpStatus.UNAUTHORIZED);
    }

    const decodedToken = decodeJwt(token);

    if (isNil(decodedToken) || isNil(decodedToken[TOKEN_ORG_ID_KEY])) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }

    const organizationId:string = decodedToken[TOKEN_ORG_ID_KEY];
    return organizationId;
}

/**
* In order to reduce redundant http requests, the visit should be sent only in case it is include one of the items in the whitelist.
* @param {number} url The visited url.
* @return {boolean} true - if url is llm visit, otherwise false
*/
export const isValidVisit = (url:string): boolean => LLM_WHITELIST.some(llm => url.toLowerCase().includes(llm.toLowerCase()));