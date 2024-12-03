import { Module } from "@nestjs/common";
import { VisitController } from "src/controllers/visit.controller";
import { IDbRepository } from "src/repositories/db.repository.interface";
import { MongoDbRepository } from "src/repositories/mongo.db.repository";
import { MongoVisitRepository } from "src/repositories/mongo.visit.repository";
import { IVisitRepository } from "src/repositories/visit.repository.interface";
import { VisitService } from "src/services/visit.service";
import { IVisitService } from "src/services/visit.service.interface";

@Module({
    controllers:[VisitController],
    providers:[
        {
            provide: IVisitRepository,
            useClass:MongoVisitRepository,
        },
        {
            provide: IVisitService,
            useClass: VisitService,
        },
        {
            provide: IDbRepository,
            useClass: MongoDbRepository,
        },
    ]
})

export class VisitModule{}