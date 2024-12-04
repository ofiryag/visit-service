import { BulkResult } from "src/contracts/dtos";
import { BULK_RESULT_STATUSES } from "./consts";

export const bulkStatusCalculator = <T>(result:BulkResult<T>):string=>{
    if(result.failures?.length === 0)
        return BULK_RESULT_STATUSES.SUCCESS;
    else if(result.successes?.length === 0)
        return BULK_RESULT_STATUSES.FAILED;
    else if(result.successes?.length !== 0 && result.failures?.length !== 0)
        return BULK_RESULT_STATUSES.PARTIAL_SUCCESS;
}