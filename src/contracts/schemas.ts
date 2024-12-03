import { z } from "zod";

export const postVisitRequestSchema = z.object({
    url: z.string().url("Invalid URL format"),
    time: z.coerce.date(),
  });

export const bulkVisitRequestSchema = z.object({
    visits: z.array(postVisitRequestSchema).min(1, 'At least one visit is required'),
    organization_id: z.string().min(1, 'Organization ID is required'),
  });
  
  export const getVisitRequestSchema = z.object({
    organization_id: z.string(),
    offset: z.number().optional(),
    limit: z.number().optional(),
  }).refine((data) => {
    // If offset is provided, limit must also be provided
    return (
      (data.offset === undefined && data.limit === undefined) || 
      (data.offset !== undefined && data.limit !== undefined)
    );
  }, {
    message: 'If offset is provided, limit must also be provided',
  });