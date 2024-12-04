import { BulkResult } from "src/contracts/dtos";

export const bulkStatusCalculator = <T>(result:BulkResult<T>):string=>{
    if(result.failures?.length === 0)
        return "success";
    else if(result.successes?.length === 0)
        return "failed";
    else if(result.successes?.length !== 0 && result.failures?.length !== 0)
        return "partial success";
}