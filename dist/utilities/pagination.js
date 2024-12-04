"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parsePaginationQueryParams = parsePaginationQueryParams;
const consts_1 = require("./consts");
function parsePaginationQueryParams(req) {
    let offset = Number(req.query[consts_1.API_PARAMS.OFFSET]);
    if (isNaN(offset))
        offset = consts_1.API_PARAMS.DEFAULTS.OFFSET;
    let limit = Number(req.query[consts_1.API_PARAMS.LIMIT]);
    if (isNaN(limit))
        limit = consts_1.API_PARAMS.DEFAULTS.LIMIT;
    return { offset, limit };
}
//# sourceMappingURL=pagination.js.map