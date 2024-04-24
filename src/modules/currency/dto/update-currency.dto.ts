import { createZodDto } from '@anatine/zod-nestjs';
import * as z from 'zod';
import { extendZodWithOpenApi } from '@anatine/zod-openapi';
import { CreateCurrencyDtoSchema } from './create-currency.dto';

extendZodWithOpenApi(z);

const baseSchema = CreateCurrencyDtoSchema.partial();

export class UpdateCurrencyDto extends createZodDto(baseSchema) {}
