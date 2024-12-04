import { HttpException, HttpStatus } from "@nestjs/common";
import { decodeJwt } from "src/services/jwt.service";
import { isNil} from 'lodash';
import { TOKEN_ORG_ID_KEY } from "./consts";
import { Request as HttpRequest } from "express";

/**
* Extracts the organization id from JWT token.
* @param BulkVisitRequestDto The DTO containing the visit data.
* @returns Organization id.
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