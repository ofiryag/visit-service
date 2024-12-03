import { HttpException, HttpStatus } from "@nestjs/common";
import { decodeJwt } from "src/services/jwt.service";
import { isNil} from 'lodash';
import { TOKEN_ORG_ID_KEY } from "./consts";
import { Request as HttpRequest } from "express";

export const extractOrganizationIdFromRequest = (req: HttpRequest)=>{
    const token = req.headers['authorization']?.split(' ')[1]; // Extract token from Authorization header

    if (!token) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }

    const decodedToken = decodeJwt(token);

    if (isNil(decodedToken) || isNil(decodedToken[TOKEN_ORG_ID_KEY])) {
      throw new HttpException('Invalid token or missing custom claim', HttpStatus.UNAUTHORIZED);
    }

    const organizationId = decodedToken[TOKEN_ORG_ID_KEY];
    return organizationId;
}