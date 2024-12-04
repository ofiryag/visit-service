"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getVisitRequestSchema = exports.bulkVisitRequestSchema = exports.postVisitRequestSchema = void 0;
const zod_1 = require("zod");
exports.postVisitRequestSchema = zod_1.z.object({
    url: zod_1.z.string().url("Invalid URL format"),
    time: zod_1.z.coerce.date(),
});
exports.bulkVisitRequestSchema = zod_1.z.object({
    visits: zod_1.z.array(exports.postVisitRequestSchema).min(1, 'at least one visit is required'),
    organization_id: zod_1.z.string().min(1, 'organization id is required'),
});
exports.getVisitRequestSchema = zod_1.z.object({
    organization_id: zod_1.z.string(),
    offset: zod_1.z.number(),
    limit: zod_1.z.number(),
});
//# sourceMappingURL=schemas.js.map