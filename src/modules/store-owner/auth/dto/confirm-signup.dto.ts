import { createZodDto } from '@anatine/zod-nestjs';
import { StoreOwnerSchema } from 'src/generated';
import * as imports from 'src/generated/zod/schemas';
import { z } from 'zod';

export class ConfirmSignupDto extends createZodDto(
  StoreOwnerSchema.pick({
    email: true,
    signupCode: true,
  })
    .extend({ password: imports.passwordSchema })
    .strict(),
) {}
