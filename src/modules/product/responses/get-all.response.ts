import { createZodDto } from '@anatine/zod-nestjs';
import {
  AppResponseSchema,
  ReturnedResponseSchema,
} from 'src/shared/interfaces/response.interface';
import { z } from 'zod';
import { ProductEntitySchema } from '../entity';

export const productsData = z.object({
  products: z.array(ProductEntitySchema),
});

export const ReturnedGetAllProductsResponseSchema =
  ReturnedResponseSchema.merge(z.strictObject({ data: productsData }));

export const AppGetAllProductsResponseSchema = AppResponseSchema.merge(
  z.object({ data: productsData }),
);

export class ReturnedGetAllProductsResponse extends createZodDto(
  ReturnedGetAllProductsResponseSchema,
) {}
export class AppGetAllProductsResponse extends createZodDto(
  AppGetAllProductsResponseSchema,
) {}
