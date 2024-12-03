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
exports.VisitService = void 0;
const common_1 = require("@nestjs/common");
const lodash_1 = require("lodash");
const visit_repository_interface_1 = require("../repositories/visit.repository.interface");
let VisitService = class VisitService {
    constructor(visitRepository) {
        this.visitRepository = visitRepository;
    }
    async getVisits(request) {
        try {
            console.log(`trying to get visits for organization id ${request.organization_id}`);
            const visits = await this.visitRepository.getVisits(request);
            if (visits.length === 0 || (0, lodash_1.isNil)(visits)) {
                console.log("could not find visits");
                return visits;
            }
            console.log(`successfully got visits for organization id ${request.organization_id}`);
            return visits;
        }
        catch (error) {
        }
    }
    async bulkInsertVisits(request) {
        try {
            console.log(`trying to insert visits for organization id ${request.organization_id}`);
            const result = await this.visitRepository.bulkInsertVisits(request);
            console.log(`successfully inserted visits for organization id ${request.organization_id}`);
            return result;
        }
        catch (error) {
        }
    }
};
exports.VisitService = VisitService;
exports.VisitService = VisitService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(visit_repository_interface_1.IVisitRepository)),
    __metadata("design:paramtypes", [Object])
], VisitService);
//# sourceMappingURL=visit.service.js.map