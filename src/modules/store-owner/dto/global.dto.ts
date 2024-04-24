import { createZodDto } from '@anatine/zod-nestjs';

import { StoreOwnerEntitySchema } from '../entity';
import {
  AppResponseSchema,
  ReturnedResponseSchema,
} from 'src/shared/interfaces/response.interface';
import { z } from 'zod';

const storeOwnerData = z.object({ storeOwner: StoreOwnerEntitySchema });

export const ReturnedStoreOwnerResponseSchema = ReturnedResponseSchema.merge(
  z.strictObject({ data: storeOwnerData }),
);

export const AppStoreOwnerResponseSchema = AppResponseSchema.merge(
  z.object({ data: storeOwnerData }),
);

export class ReturnedStoreOwnerResponse extends createZodDto(
  ReturnedStoreOwnerResponseSchema,
) {}
export class AppStoreOwnerResponse extends createZodDto(
  AppStoreOwnerResponseSchema,
) {}
