import { z } from "zod";
export declare const postVisitRequestSchema: z.ZodObject<{
    url: z.ZodString;
    time: z.ZodDate;
}, "strip", z.ZodTypeAny, {
    url?: string;
    time?: Date;
}, {
    url?: string;
    time?: Date;
}>;
export declare const bulkVisitRequestSchema: z.ZodObject<{
    visits: z.ZodArray<z.ZodObject<{
        url: z.ZodString;
        time: z.ZodDate;
    }, "strip", z.ZodTypeAny, {
        url?: string;
        time?: Date;
    }, {
        url?: string;
        time?: Date;
    }>, "many">;
    organization_id: z.ZodString;
}, "strip", z.ZodTypeAny, {
    visits?: {
        url?: string;
        time?: Date;
    }[];
    organization_id?: string;
}, {
    visits?: {
        url?: string;
        time?: Date;
    }[];
    organization_id?: string;
}>;
export declare const getVisitRequestSchema: z.ZodObject<{
    organization_id: z.ZodString;
    offset: z.ZodNumber;
    limit: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    organization_id?: string;
    offset?: number;
    limit?: number;
}, {
    organization_id?: string;
    offset?: number;
    limit?: number;
}>;
