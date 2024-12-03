import { Inject, Injectable } from "@nestjs/common";
import { IVisitService } from "./visit.service.interface";
import { BulkVisitRequestDto, GetVisitRequestDto, GetVisitResponseDto, PostVisitRequestDto } from "src/contracts/dtos";
import { isNil} from 'lodash';
import { IVisitRepository } from "src/repositories/visit.repository.interface";
import { InsertManyResult } from "mongodb";

@Injectable()
export class VisitService implements IVisitService {
    constructor( @Inject(IVisitRepository) private readonly visitRepository: IVisitRepository) {}

    async getVisits(request:GetVisitRequestDto): Promise<GetVisitResponseDto[]>{
        try {
            console.log(`trying to get visits for organization id ${request.organization_id}`)
            const visits = await this.visitRepository.getVisits(request);
            if(visits.length === 0 || isNil(visits)){
                console.log("could not find visits")
                return visits;            
            }
            console.log(`successfully got visits for organization id ${request.organization_id}`)
            return visits;
        } catch (error) {
            
        }
        
    }
    
    async bulkInsertVisits (request: BulkVisitRequestDto): Promise<InsertManyResult<Document>>{
        try {
            console.log(`trying to insert visits for organization id ${request.organization_id}`)
            const result = await this.visitRepository.bulkInsertVisits(request);
            console.log(`successfully inserted visits for organization id ${request.organization_id}`)
            return result as InsertManyResult<Document>;
        } catch (error) {
            
        }
    }
}