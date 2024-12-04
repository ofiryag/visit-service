import { Request } from "express";
import { API_PARAMS } from "./consts";

/**
 * Parses the offset and limit query params from the request query params and returns them as integers.
 * If any of the parameters are missing or invalid, defaults are assigned.
 * @param req - The request object
 * @returns An object containing the parsed offset and limit values.
 */
export function parsePaginationQueryParams(req: Request): { offset: number, limit: number } {
    let offset = Number(req.query[API_PARAMS.OFFSET]);
    if (isNaN(offset)) 
        offset = API_PARAMS.DEFAULTS.OFFSET;
  
    let limit = Number(req.query[API_PARAMS.LIMIT]);
    if (isNaN(limit)) 
        limit = API_PARAMS.DEFAULTS.LIMIT;
  
    return { offset, limit };
  }