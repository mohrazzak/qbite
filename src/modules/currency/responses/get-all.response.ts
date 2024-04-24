import {
  AppResponseSchema,
  ReturnedResponseSchema,
} from 'src/shared/interfaces/response.interface';
import { createZodDto } from '@anatine/zod-nestjs';
import { z } from 'zod';
import { CurrencyEntitySchema } from '../entities/currency.entity';

export const GetCurrenciesSchema = z.object({
  currencies: z.array(CurrencyEntitySchema),
});

export const ReturnedCurrenciesResponseSchema = ReturnedResponseSchema.merge(
  z.strictObject({ data: GetCurrenciesSchema }),
);

export const AppCurrenciesResponseSchema = AppResponseSchema.merge(
  z.object({ data: GetCurrenciesSchema }),
);

export class AppGetAllCurrenciesResponse extends createZodDto(
  AppCurrenciesResponseSchema,
) {}

export class ReturnedGetAllCurrenciesResponse extends createZodDto(
  ReturnedCurrenciesResponseSchema,
) {}
