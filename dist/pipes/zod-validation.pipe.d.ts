import { PipeTransform } from '@nestjs/common';
import { z } from 'zod';
export declare class ZodValidationPipe implements PipeTransform {
    private schema;
    constructor(schema: z.ZodSchema);
    transform(value: any): any;
}
