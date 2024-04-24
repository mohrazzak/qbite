import { createZodDto } from '@anatine/zod-nestjs';
import * as z from 'zod';
import {
  AppResponseSchema,
  ReturnedResponseSchema,
} from 'src/shared/interfaces/response.interface';
import { ProductEntitySchema, ProductMultiLangFields } from '../entity';

export const createProductSchema = ProductEntitySchema.pick({
  slug: true,
  categoryId: true,
}).merge(ProductMultiLangFields);

export const productData = z.object({
  product: ProductEntitySchema,
});

export const ReturnedProductResponseSchema = ReturnedResponseSchema.merge(
  z.strictObject({ data: productData }),
);

export const AppProductResponseSchema = AppResponseSchema.merge(
  z.object({ data: productData }),
);

export class ReturnedProductResponse extends createZodDto(
  ReturnedProductResponseSchema,
) {}
export class AppProductResponse extends createZodDto(
  AppProductResponseSchema,
) {}
