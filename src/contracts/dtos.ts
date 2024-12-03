import { z } from 'zod';
import { bulkVisitRequestSchema, getVisitRequestSchema, postVisitRequestSchema } from './schemas';

//ToDO GetVisitResponseDto - docu
export type GetVisitResponseDto = {
    url: string;
    time: Date;
}
export type PostVisitRequestDto = z.infer<typeof postVisitRequestSchema>;
export type BulkVisitRequestDto = z.infer<typeof bulkVisitRequestSchema>;
export type GetVisitRequestDto = z.infer<typeof getVisitRequestSchema>;