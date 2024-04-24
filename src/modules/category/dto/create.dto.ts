import { createZodDto } from '@anatine/zod-nestjs';
import { extendZodWithOpenApi } from '@anatine/zod-openapi';
import { CategorySchema } from 'src/generated';
import { SupportedLanguages } from 'src/shared';
import * as z from 'zod';

extendZodWithOpenApi(z);

const baseSchema = CategorySchema.pick({
  icon: true,
  storeId: true,
}).merge(
  z.object({
    language: z.nativeEnum(SupportedLanguages),
    name: z.string(),
  }),
);

export class CreateCategoryDto extends createZodDto(baseSchema) {}
