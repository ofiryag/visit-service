import { HttpException, HttpStatus } from "@nestjs/common";
import { decodeJwt } from "src/services/jwt.service";
import { isNil} from 'lodash';
import { TOKEN_ORG_ID_KEY } from "./consts";
import { Request as HttpRequest } from "express";

export const extractOrganizationIdFromRequest = (req: HttpRequest)=>{
    const token = req.headers["authorization"]?.split(" ").at(1); // Extract token from Authorization header

    if (isNil(token)) {
      throw new HttpException("Unauthorized", HttpStatus.UNAUTHORIZED);
    }

    const decodedToken = decodeJwt(token);

    if (isNil(decodedToken) || isNil(decodedToken[TOKEN_ORG_ID_KEY])) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }

    const organizationId = decodedToken[TOKEN_ORG_ID_KEY];
    return organizationId;
}