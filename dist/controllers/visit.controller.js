"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VisitController = void 0;
const common_1 = require("@nestjs/common");
const schemas_1 = require("../contracts/schemas");
const visit_service_interface_1 = require("../services/visit.service.interface");
const consts_1 = require("../utilities/consts");
const helpers_1 = require("../utilities/helpers");
const pagination_1 = require("../utilities/pagination");
let VisitController = class VisitController {
    constructor(visitService) {
        this.visitService = visitService;
    }
    async getVisits(req) {
        const organization_id = (0, helpers_1.extractOrganizationIdFromRequest)(req);
        const { offset, limit } = (0, pagination_1.parsePaginationQueryParams)(req);
        console.log(`trying to get visits for organization id ${organization_id}`);
        const request = { offset, limit, organization_id };
        const zodResult = schemas_1.getVisitRequestSchema.safeParse(request);
        if (!zodResult.success) {
            console.log(`failed to get visits for organization id ${organization_id}, error:`, zodResult.error);
            throw new common_1.HttpException(zodResult.error, common_1.HttpStatus.BAD_REQUEST);
        }
        const result = await this.visitService.getVisits(request);
        console.log(`successfully got visits for organization id ${request.organization_id}`);
        return result;
    }
    async bulkInsertVisits(req) {
        const organization_id = (0, helpers_1.extractOrganizationIdFromRequest)(req);
        console.log(`trying to insert visits for organization id ${organization_id}`);
        const visits = req.body;
        const request = { organization_id, visits };
        const zodResult = schemas_1.bulkVisitRequestSchema.safeParse(request);
        if (!zodResult.success) {
            console.log(`failed to insert visits for organization id ${organization_id}, error:`, zodResult.error);
            throw new common_1.HttpException(zodResult.error, common_1.HttpStatus.BAD_REQUEST);
        }
        const result = await this.visitService.bulkInsertVisits(zodResult.data);
        console.log(`successfully inserted ${result.insertedCount} visits for organization id ${organization_id}`);
        return result;
    }
};
exports.VisitController = VisitController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], VisitController.prototype, "getVisits", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], VisitController.prototype, "bulkInsertVisits", null);
exports.VisitController = VisitController = __decorate([
    (0, common_1.Controller)(`${consts_1.API_V1}/visit`),
    __param(0, (0, common_1.Inject)(visit_service_interface_1.IVisitService)),
    __metadata("design:paramtypes", [Object])
], VisitController);
//# sourceMappingURL=visit.controller.js.map