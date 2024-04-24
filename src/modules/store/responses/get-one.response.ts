import {
  AppResponseSchema,
  ReturnedResponseSchema,
} from 'src/shared/interfaces/response.interface';
import { createZodDto } from '@anatine/zod-nestjs';
import { z } from 'zod';
import { StoreEntitySchema } from '../entity';

export const GetStoreSchema = z.object({
  store: StoreEntitySchema,
});

export const ReturnedStoreResponseSchema = ReturnedResponseSchema.merge(
  z.strictObject({ data: GetStoreSchema }),
);

export const AppStoreResponseSchema = AppResponseSchema.merge(
  z.object({ data: GetStoreSchema }),
);

export class AppStoreResponse extends createZodDto(AppStoreResponseSchema) {}

export class ReturnedStoreResponse extends createZodDto(
  ReturnedStoreResponseSchema,
) {}
