import {
  AppResponseSchema,
  ReturnedResponseSchema,
} from 'src/shared/interfaces/response.interface';
import { createZodDto } from '@anatine/zod-nestjs';
import { z } from 'zod';
import { CurrencyEntitySchema } from '../entities/currency.entity';

export const GetCurrencySchema = z.object({
  currency: CurrencyEntitySchema,
});

export const ReturnedCurrencyResponseSchema = ReturnedResponseSchema.merge(
  z.strictObject({ data: GetCurrencySchema }),
);

export const AppCurrencyResponseSchema = AppResponseSchema.merge(
  z.object({ data: GetCurrencySchema }),
);

export class AppCurrencyResponse extends createZodDto(
  AppCurrencyResponseSchema,
) {}

export class ReturnedCurrencyResponse extends createZodDto(
  ReturnedCurrencyResponseSchema,
) {}
