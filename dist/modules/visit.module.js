"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VisitModule = void 0;
const common_1 = require("@nestjs/common");
const visit_controller_1 = require("../controllers/visit.controller");
const db_repository_interface_1 = require("../repositories/db.repository.interface");
const mongo_db_repository_1 = require("../repositories/mongo.db.repository");
const mongo_visit_repository_1 = require("../repositories/mongo.visit.repository");
const visit_repository_interface_1 = require("../repositories/visit.repository.interface");
const visit_service_1 = require("../services/visit.service");
const visit_service_interface_1 = require("../services/visit.service.interface");
let VisitModule = class VisitModule {
};
exports.VisitModule = VisitModule;
exports.VisitModule = VisitModule = __decorate([
    (0, common_1.Module)({
        controllers: [visit_controller_1.VisitController],
        providers: [
            {
                provide: visit_repository_interface_1.IVisitRepository,
                useClass: mongo_visit_repository_1.MongoVisitRepository,
            },
            {
                provide: visit_service_interface_1.IVisitService,
                useClass: visit_service_1.VisitService,
            },
            {
                provide: db_repository_interface_1.IDbRepository,
                useClass: mongo_db_repository_1.MongoDbRepository,
            },
        ]
    })
], VisitModule);
//# sourceMappingURL=visit.module.js.map