import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { IVisitService } from "./visit.service.interface";
import { BulkResult, BulkVisitRequestDto, GetVisitRequestDto, GetVisitResponseDto, PaginatedResult, PostVisitRequestDto } from "src/contracts/dtos";
import { IVisitRepository } from "src/repositories/visit.repository.interface";
import { InsertManyResult } from "mongodb";
import { isValidVisit } from "src/utilities/helpers";
import { bulkStatusCalculator } from "src/utilities/bulk";
import { BULK_RESULT_STATUSES } from "src/utilities/consts";

@Injectable()
export class VisitService implements IVisitService {
    constructor( @Inject(IVisitRepository) private readonly visitRepository: IVisitRepository) {}

    async getVisits(request:GetVisitRequestDto): Promise<PaginatedResult<GetVisitResponseDto>>{
        const visits = await this.visitRepository.getVisits(request);
        return visits;
    }
    
    async bulkInsertVisits (request: BulkVisitRequestDto): Promise<BulkResult<PostVisitRequestDto>>{
        const {visits} = request;

        let vaildVisitsRequest: BulkVisitRequestDto = {organization_id:request.organization_id};
        
        const { successes, failures } = visits.reduce((acc, v) => {
        if (isValidVisit(v.url)) {
            acc.successes.push(v);
        } else {
            acc.failures.push(v);
        }
        return acc;
        }, { successes: [], failures: [] });
        
        const bulkResult: BulkResult<PostVisitRequestDto> = {
            successes,
            failures,
            status: ""
        }

        //If all of the requests are invalid, no need to send it 
        if (bulkResult.successes.length === 0){
                bulkResult.status = bulkStatusCalculator(bulkResult);
                return bulkResult;
            } 

        try {
            vaildVisitsRequest.visits = bulkResult.successes;
            await this.visitRepository.bulkInsertVisits(vaildVisitsRequest) as InsertManyResult<Document>;
            bulkResult.status = bulkStatusCalculator(bulkResult);
            return bulkResult;
        } catch (error) {
            console.error('failed to insert visits, error:', error);
            bulkResult.status = BULK_RESULT_STATUSES.ERROR;
            bulkResult.failures.push(...bulkResult.successes);
            bulkResult.successes = [];
            throw new HttpException(bulkResult, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}