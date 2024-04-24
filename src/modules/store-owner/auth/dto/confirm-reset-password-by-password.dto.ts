import { createZodDto } from '@anatine/zod-nestjs';
import { StoreOwnerSchema } from 'src/generated';
import { z } from 'zod';

const ConfirmResetStoreOwnerPasswordByPasswordDtoSchema = z
  .object({
    resetToken: z.string(),
  })
  .strict();

export class ConfirmResetStoreOwnerPasswordByPasswordDto extends createZodDto(
  ConfirmResetStoreOwnerPasswordByPasswordDtoSchema.merge(
    StoreOwnerSchema.pick({ password: true }),
  ).strict(),
) {}
