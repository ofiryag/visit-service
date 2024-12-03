"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractOrganizationIdFromRequest = void 0;
const common_1 = require("@nestjs/common");
const jwt_service_1 = require("../services/jwt.service");
const lodash_1 = require("lodash");
const consts_1 = require("./consts");
const extractOrganizationIdFromRequest = (req) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
        throw new common_1.HttpException('Unauthorized', common_1.HttpStatus.UNAUTHORIZED);
    }
    const decodedToken = (0, jwt_service_1.decodeJwt)(token);
    if ((0, lodash_1.isNil)(decodedToken) || (0, lodash_1.isNil)(decodedToken[consts_1.TOKEN_ORG_ID_KEY])) {
        throw new common_1.HttpException('Invalid token or missing custom claim', common_1.HttpStatus.UNAUTHORIZED);
    }
    const organizationId = decodedToken[consts_1.TOKEN_ORG_ID_KEY];
    return organizationId;
};
exports.extractOrganizationIdFromRequest = extractOrganizationIdFromRequest;
//# sourceMappingURL=helpers.js.map