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
exports.MongoVisitRepository = void 0;
const common_1 = require("@nestjs/common");
const db_repository_interface_1 = require("./db.repository.interface");
const consts_1 = require("../utilities/consts");
let MongoVisitRepository = class MongoVisitRepository {
    constructor(dbRepository) {
        this.dbRepository = dbRepository;
    }
    async getVisits(request) {
        try {
            const dbClient = await this.dbRepository.connectToDatabase();
            const orgDb = dbClient.db(`org_${request.organization_id}`);
            const visitsCollection = orgDb.collection(consts_1.MONGO.COLLECTIONS.VISITS);
            const visitAggregation = [];
            if (request.limit && request.offset)
                visitAggregation.push(...buildPaginationStages(request));
            visitAggregation.push({
                $project: {
                    _id: 0
                }
            });
            const documents = await visitsCollection.aggregate(visitAggregation).toArray();
            return documents;
        }
        catch (error) {
            console.log(`failed to get visits from mongoDB for organization_id ${request.organization_id}, error: ${error}`);
            throw new common_1.HttpException(`failed to get visits for organization_id ${request.organization_id}`, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async bulkInsertVisits(request) {
        try {
            const dbClient = await this.dbRepository.connectToDatabase();
            const orgDb = dbClient.db(`org_${request.organization_id}`);
            const visitsCollection = orgDb.collection(consts_1.MONGO.COLLECTIONS.VISITS);
            const result = await visitsCollection.insertMany(request.visits);
            return result;
        }
        catch (error) {
            console.log(`failed to insert visits to mongoDB for organization_id ${request.organization_id}, error: ${error}`);
            throw new common_1.HttpException(`failed to insert visits for organization_id ${request.organization_id}`, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.MongoVisitRepository = MongoVisitRepository;
exports.MongoVisitRepository = MongoVisitRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(db_repository_interface_1.IDbRepository)),
    __metadata("design:paramtypes", [Object])
], MongoVisitRepository);
const buildPaginationStages = (request) => {
    return [
        {
            $skip: (request.limit * request.offset)
        },
        {
            $limit: request.limit
        }
    ];
};
//# sourceMappingURL=mongo.visit.repository.js.map