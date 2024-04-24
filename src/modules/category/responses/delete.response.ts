import { createZodDto } from '@anatine/zod-nestjs';
import * as z from 'zod';
import {
  AppResponseSchema,
  ReturnedResponseSchema,
} from 'src/shared/interfaces/response.interface';
import { CategoryEntitySchema } from '../entity';

export const deleteCategoryData = z.object({
  category: CategoryEntitySchema.pick({ id: true }),
});

export const ReturnedDeleteCategoryResponseSchema =
  ReturnedResponseSchema.merge(z.strictObject({ data: deleteCategoryData }));

export const AppDeleteCategoryResponseSchema = AppResponseSchema.merge(
  z.object({ data: deleteCategoryData }),
);

export class ReturnedDeleteCategoryResponse extends createZodDto(
  ReturnedDeleteCategoryResponseSchema,
) {}
export class AppDeleteCategoryResponse extends createZodDto(
  AppDeleteCategoryResponseSchema,
) {}
