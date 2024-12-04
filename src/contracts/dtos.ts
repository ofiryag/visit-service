import { z } from 'zod';
import { bulkVisitRequestSchema, getVisitRequestSchema, postVisitRequestSchema } from './schemas';

 /**
 * Represents a visit response item.
 */
 export type GetVisitResponseDto = {
    url: string;
    time: Date;
}

 /**
 * Represents a paginated result structure.
 * 
 * @template T - The type of the items in the paginated result.
 */
export type PaginatedResult<T> = {
    data: T[];          // List of items returned in the current page
    totalCount: number; // Total number of items
    totalPages: number; // Total number of pages
  }

export type PostVisitRequestDto = z.infer<typeof postVisitRequestSchema>;
export type BulkVisitRequestDto = z.infer<typeof bulkVisitRequestSchema>;
export type GetVisitRequestDto = z.infer<typeof getVisitRequestSchema>;