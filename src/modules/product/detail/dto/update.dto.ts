import { createZodDto } from '@anatine/zod-nestjs';
import * as z from 'zod';
import { extendZodWithOpenApi } from '@anatine/zod-openapi';
import { CreateProductDetailBaseSchema } from './create.dto';
import { MultiLangFieldSchema } from 'src/modules/translate/schemas';

extendZodWithOpenApi(z);

const baseSchema = CreateProductDetailBaseSchema.pick({
  icon: true,
}).merge(z.object({ unit: MultiLangFieldSchema }));

export class UpdateProductDetailDto extends createZodDto(baseSchema) {}
