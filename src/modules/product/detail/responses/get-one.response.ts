import { createZodDto } from '@anatine/zod-nestjs';
import * as z from 'zod';
import {
  AppResponseSchema,
  ReturnedResponseSchema,
} from 'src/shared/interfaces/response.interface';
import { ProductDetailEntitySchema, DetailMultiLangFields } from '../entity';

export const createProductSchema = ProductDetailEntitySchema.merge(
  DetailMultiLangFields,
);

export const productDetailData = z.object({
  detail: ProductDetailEntitySchema,
});

export const ReturnedProductResponseSchema = ReturnedResponseSchema.merge(
  z.strictObject({ data: productDetailData }),
);

export const AppProductResponseSchema = AppResponseSchema.merge(
  z.object({ data: productDetailData }),
);

export class ReturnedProductDetailResponse extends createZodDto(
  ReturnedProductResponseSchema,
) {}
export class AppProductDetailResponse extends createZodDto(
  AppProductResponseSchema,
) {}
