import { createZodDto } from '@anatine/zod-nestjs';
import * as z from 'zod';
import {
  AppResponseSchema,
  ReturnedResponseSchema,
} from 'src/shared/interfaces/response.interface';
import { CategoryEntitySchema } from '../entity';

export const categoryData = z.object({
  category: CategoryEntitySchema,
});

export const ReturnedCategoryResponseSchema = ReturnedResponseSchema.merge(
  z.strictObject({ data: categoryData }),
);

export const AppCategoryResponseSchema = AppResponseSchema.merge(
  z.object({ data: categoryData }),
);

export class ReturnedCategoryResponse extends createZodDto(
  ReturnedCategoryResponseSchema,
) {}
export class AppCategoryResponse extends createZodDto(
  AppCategoryResponseSchema,
) {}
