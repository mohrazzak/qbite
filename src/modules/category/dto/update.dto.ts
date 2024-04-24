import { createZodDto } from '@anatine/zod-nestjs';
import { extendZodWithOpenApi } from '@anatine/zod-openapi';
import { CategorySchema } from 'src/generated';
import { MultiLangFieldSchema } from 'src/modules/translate/schemas';
import * as z from 'zod';

extendZodWithOpenApi(z);

const baseSchema = CategorySchema.pick({
  icon: true,
}).merge(
  z.object({
    name: MultiLangFieldSchema,
  }),
);

export class UpdateCategoryDto extends createZodDto(baseSchema) {}
