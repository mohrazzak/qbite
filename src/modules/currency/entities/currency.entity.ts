import { CurrencySchema } from 'src/generated';
import { createZodDto } from '@anatine/zod-nestjs';

export const CurrencyEntitySchema = CurrencySchema.pick({
  id: true,
  name: true,
  symbol: true,
});

export class CurrencyEntity extends createZodDto(CurrencyEntitySchema) {}
