import { createZodDto } from '@anatine/zod-nestjs';
import { extendZodWithOpenApi } from '@anatine/zod-openapi';
import * as z from 'zod';
import { CurrencyEntitySchema } from '../entities/currency.entity';

extendZodWithOpenApi(z);

export const CreateCurrencyDtoSchema = CurrencyEntitySchema.omit({
  id: true,
});

export class CreateCurrencyDto extends createZodDto(CreateCurrencyDtoSchema) {}
