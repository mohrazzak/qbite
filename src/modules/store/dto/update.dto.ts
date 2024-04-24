import { createZodDto } from '@anatine/zod-nestjs';
import * as z from 'zod';
import { extendApi, extendZodWithOpenApi } from '@anatine/zod-openapi';
import { CreateStoreBaseSchema } from './create.dto';
import { MultiLangFieldSchema } from 'src/modules/translate/schemas';

extendZodWithOpenApi(z);

const baseSchema = CreateStoreBaseSchema.omit({ language: true })
  .merge(
    z.object({
      name: MultiLangFieldSchema,
      description: MultiLangFieldSchema,
      slogan: MultiLangFieldSchema.nullable(),
    }),
  )
  .partial();

const UpdateStoreDtoSchema = extendApi(baseSchema, {
  properties: {
    logoFile: { type: 'string', format: 'binary' },
    backgroundFile: { type: 'string', format: 'binary' },
  },
});

export class UpdateStoreDto extends createZodDto(UpdateStoreDtoSchema) {}
