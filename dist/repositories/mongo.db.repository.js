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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoDbRepository = void 0;
const common_1 = require("@nestjs/common");
const mongodb_1 = require("mongodb");
let MongoDbRepository = class MongoDbRepository {
    constructor() { }
    async connectToDatabase() {
        const client = new mongodb_1.MongoClient("mongodb://localhost:27017", {});
        try {
            await client.connect();
            console.log('Connected to MongoDB');
            return client;
        }
        catch (error) {
            console.error('Error connecting to MongoDB', error);
        }
    }
};
exports.MongoDbRepository = MongoDbRepository;
exports.MongoDbRepository = MongoDbRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], MongoDbRepository);
//# sourceMappingURL=mongo.db.repository.js.map