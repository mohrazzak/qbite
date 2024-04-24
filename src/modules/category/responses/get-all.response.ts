import { createZodDto } from '@anatine/zod-nestjs';
import {
  AppResponseSchema,
  ReturnedResponseSchema,
} from 'src/shared/interfaces/response.interface';
import { z } from 'zod';
import { CategoryEntitySchema } from '../entity';

export const categoriesData = z.object({
  categories: z.array(CategoryEntitySchema),
});

export const ReturnedGetAllCategoriesResponseSchema =
  ReturnedResponseSchema.merge(z.strictObject({ data: categoriesData }));

export const AppGetAllCategoriesResponseSchema = AppResponseSchema.merge(
  z.object({ data: categoriesData }),
);

export class ReturnedGetAllCategoriesResponse extends createZodDto(
  ReturnedGetAllCategoriesResponseSchema,
) {}
export class AppGetAllCategoriesResponse extends createZodDto(
  AppGetAllCategoriesResponseSchema,
) {}
