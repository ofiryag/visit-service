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
const visit_service_interface_1 = require("../services/visit.service.interface");
const consts_1 = require("../utilities/consts");
const helpers_1 = require("../utilities/helpers");
let VisitController = class VisitController {
    constructor(visitService) {
        this.visitService = visitService;
    }
    async getVisits(req) {
        const offset = Number(req.params[consts_1.API_PARAMS.OFFSET]);
        const limit = Number(req.params[consts_1.API_PARAMS.LIMIT]);
        const organization_id = (0, helpers_1.extractOrganizationIdFromRequest)(req);
        const request = {
            offset,
            limit,
            organization_id
        };
        return await this.visitService.getVisits(request);
    }
    async bulkInsertVisits(req) {
        const visits = req.body;
        const organization_id = (0, helpers_1.extractOrganizationIdFromRequest)(req);
        const request = {
            organization_id,
            visits
        };
        console.log(request);
        return await this.visitService.bulkInsertVisits(request);
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