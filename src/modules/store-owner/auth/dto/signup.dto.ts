import { createZodDto } from '@anatine/zod-nestjs';
import { StoreOwnerSchema } from 'src/generated';
import { passwordSchema } from 'src/generated/zod/schemas';
import * as z from 'zod';

export class SignupDto extends createZodDto(
  StoreOwnerSchema.pick({ email: true })
    .merge(
      z.object({
        password: passwordSchema.optional(),
        planVersionId: z.number(),
        termsAndConditions: z.boolean().refine((value) => value === true, {
          params: { i18n: 'termsAndConditionsRequired' },
        }),
      }),
    )
    .strict(),
) {}

// TODO change the returned statusCode to 201 in the swagger
