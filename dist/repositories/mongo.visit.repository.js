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
        const dbClient = await this.dbRepository.connectToDatabase();
        const orgDb = dbClient.db(`org_${request.organization_id}`);
        console.log(orgDb.databaseName);
        const visitsCollection = orgDb.collection(consts_1.MONGO.COLLECTIONS.VISITS);
        console.log(visitsCollection.collectionName);
        const documents = await visitsCollection.find({}).project({ "_id": 0 }).toArray();
        console.log(documents);
        return documents;
    }
    async bulkInsertVisits(request) {
        try {
            const dbClient = await this.dbRepository.connectToDatabase();
            const orgDb = dbClient.db(`org_${request.organization_id}`);
            console.log(orgDb.databaseName);
            const visitsCollection = orgDb.collection(consts_1.MONGO.COLLECTIONS.VISITS);
            visitsCollection.collectionName;
            console.log(visitsCollection.collectionName);
            console.log(request.visits);
            const documents = await visitsCollection.insertMany(request.visits);
            console.log(documents);
            return;
        }
        catch (error) {
            console.log(error);
        }
    }
};
exports.MongoVisitRepository = MongoVisitRepository;
exports.MongoVisitRepository = MongoVisitRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(db_repository_interface_1.IDbRepository)),
    __metadata("design:paramtypes", [Object])
], MongoVisitRepository);
//# sourceMappingURL=mongo.visit.repository.js.map