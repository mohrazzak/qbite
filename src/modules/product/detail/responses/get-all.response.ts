import { createZodDto } from '@anatine/zod-nestjs';
import {
  AppResponseSchema,
  ReturnedResponseSchema,
} from 'src/shared/interfaces/response.interface';
import { z } from 'zod';
import { ProductDetailEntitySchema } from '../entity';

export const productDetailsData = z.object({
  details: z.array(ProductDetailEntitySchema),
});

export const ReturnedGetAllProductDetailsResponseSchema =
  ReturnedResponseSchema.merge(z.strictObject({ data: productDetailsData }));

export const AppGetAllProductDetailsResponseSchema = AppResponseSchema.merge(
  z.object({ data: productDetailsData }),
);

export class ReturnedGetAllProductDetailsResponse extends createZodDto(
  ReturnedGetAllProductDetailsResponseSchema,
) {}
export class AppGetAllProductDetailsResponse extends createZodDto(
  AppGetAllProductDetailsResponseSchema,
) {}
