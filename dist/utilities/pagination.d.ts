import { Request } from "express";
export declare function parsePaginationQueryParams(req: Request): {
    offset: number;
    limit: number;
};
