import { createZodDto } from '@anatine/zod-nestjs';
import { StoreOwnerSchema } from 'src/generated';

export class ResetPasswordByEmailDto extends createZodDto(
  StoreOwnerSchema.pick({ email: true }).strict(),
) {}
