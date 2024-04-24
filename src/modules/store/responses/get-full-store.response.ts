import {
  AppResponseSchema,
  ReturnedResponseSchema,
} from 'src/shared/interfaces/response.interface';
import { createZodDto } from '@anatine/zod-nestjs';
import { z } from 'zod';
import { StoreEntitySchema } from '../entity';
import { ProductEntitySchema } from 'src/modules/product/entity';

export const GetFullStoreSchema = z.object({
  store: StoreEntitySchema,
  products: z.array(ProductEntitySchema),
});

export const ReturnedFullStoreResponseSchema = ReturnedResponseSchema.merge(
  z.strictObject({ data: GetFullStoreSchema }),
);

export const AppFullStoreResponseSchema = AppResponseSchema.merge(
  z.object({ data: GetFullStoreSchema }),
);

export class AppFullStoreResponse extends createZodDto(
  AppFullStoreResponseSchema,
) {}

export class ReturnedFullStoreResponse extends createZodDto(
  ReturnedFullStoreResponseSchema,
) {}
