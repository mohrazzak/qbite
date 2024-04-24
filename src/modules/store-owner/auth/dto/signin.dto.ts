import { createZodDto } from '@anatine/zod-nestjs';
import { StoreOwnerSchema } from 'src/generated';
import * as z from 'zod';
import { StoreOwnerSignInEntitySchema } from '../../entity';
import { ReturnedResponseSchema } from 'src/shared/interfaces/response.interface';
import { AppStoreOwnerResponseSchema } from '../../dto';
import { extendZodWithOpenApi } from '@anatine/zod-openapi';

extendZodWithOpenApi(z);

export class SigninDto extends createZodDto(
  StoreOwnerSchema.pick({
    email: true,
    password: true,
  }).strict(),
) {}

const TokenSchema = z.object({
  data: z.object({
    token: z.string(),
    storeOwner: StoreOwnerSignInEntitySchema,
  }),
});

const ReturnedStoreOwnerSigninResponseSchema =
  ReturnedResponseSchema.merge(TokenSchema);

export class ReturnedStoreOwnerSigninResponse extends createZodDto(
  ReturnedStoreOwnerSigninResponseSchema,
) {}

export const AppStoreOwnerSigninResponseSchema =
  AppStoreOwnerResponseSchema.merge(TokenSchema);

export class AppStoreOwnerSigninResponse extends createZodDto(
  AppStoreOwnerSigninResponseSchema,
) {}
