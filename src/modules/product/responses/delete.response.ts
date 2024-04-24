import { createZodDto } from '@anatine/zod-nestjs';
import * as z from 'zod';
import {
  AppResponseSchema,
  ReturnedResponseSchema,
} from 'src/shared/interfaces/response.interface';
import { ProductEntitySchema } from '../entity';

export const deleteProductSchema = ProductEntitySchema.pick({
  id: true,
});

export const deleteProductData = z.object({
  product: deleteProductSchema,
});

export const ReturnedDeleteProductResponseSchema = ReturnedResponseSchema.merge(
  z.strictObject({ data: deleteProductData }),
);

export const AppDeleteProductResponseSchema = AppResponseSchema.merge(
  z.object({ data: deleteProductData }),
);

export class ReturnedDeleteProductResponse extends createZodDto(
  ReturnedDeleteProductResponseSchema,
) {}
export class AppDeleteProductResponse extends createZodDto(
  AppDeleteProductResponseSchema,
) {}
