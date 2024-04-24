import { createZodDto } from '@anatine/zod-nestjs';
import { StoreOwnerSchema } from 'src/generated';
import * as z from 'zod';

const ResetStoreOwnerPasswordByPasswordDtoSchema = z
  .object({
    newPassword: z.string(),
  })
  .strict();

export class ResetStoreOwnerPasswordByPasswordDto extends createZodDto(
  ResetStoreOwnerPasswordByPasswordDtoSchema.merge(
    StoreOwnerSchema.pick({ password: true }),
  ).strict(),
) {}
