import { createZodDto } from '@anatine/zod-nestjs';
import * as z from 'zod';
import {
  AppResponseSchema,
  ReturnedResponseSchema,
} from 'src/shared/interfaces/response.interface';
import { StoreEntitySchema } from '../entity';

export const StoresData = z.strictObject({
  stores: z.array(StoreEntitySchema),
});

export const ReturnedGetAllStoresResponseSchema = ReturnedResponseSchema.merge(
  z.strictObject({ data: StoresData }),
);

export const AppGetAllStoresResponseSchema = AppResponseSchema.merge(
  z.object({ data: StoresData }),
);

export class ReturnedGetAllStoresResponse extends createZodDto(
  ReturnedGetAllStoresResponseSchema,
) {}

export class AppGetAllStoresResponse extends createZodDto(
  AppGetAllStoresResponseSchema,
) {}
