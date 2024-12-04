import { Inject, Injectable } from "@nestjs/common";
import { IVisitService } from "./visit.service.interface";
import { BulkVisitRequestDto, GetVisitRequestDto, GetVisitResponseDto, PaginatedResult, PostVisitRequestDto } from "src/contracts/dtos";
import { isNil} from 'lodash';
import { IVisitRepository } from "src/repositories/visit.repository.interface";
import { InsertManyResult } from "mongodb";

@Injectable()
export class VisitService implements IVisitService {
    constructor( @Inject(IVisitRepository) private readonly visitRepository: IVisitRepository) {}

    async getVisits(request:GetVisitRequestDto): Promise<PaginatedResult<GetVisitResponseDto>>{
        const visits = await this.visitRepository.getVisits(request);
        return visits;
    }
    
    async bulkInsertVisits (request: BulkVisitRequestDto): Promise<InsertManyResult<Document>>{
        const result = await this.visitRepository.bulkInsertVisits(request);
        return result;
    }
}