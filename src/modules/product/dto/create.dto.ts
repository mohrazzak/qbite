import { createZodDto } from '@anatine/zod-nestjs';
import { extendZodWithOpenApi, extendApi } from '@anatine/zod-openapi';
import { ProductSchema } from 'src/generated';
import { SupportedLanguages } from 'src/shared/enums/supported-languages.enum';
import * as z from 'zod';

extendZodWithOpenApi(z);

const baseSchema = ProductSchema.pick({
  slug: true,
  categoryId: true,
  storeId: true,
}).merge(
  z.object({
    language: z.nativeEnum(SupportedLanguages),
    defaultImgIndex: z.coerce.number(),
    prices: z.array(
      z.object({ currencyId: z.coerce.number(), price: z.coerce.number() }),
    ),
    details: z.array(
      z.object({
        productDetailsId: z.coerce.number(),
        value: z.string(),
      }),
    ),
    name: z.string(),
    description: z.string(),
  }),
);

const CreateProductDtoSchema = extendApi(baseSchema, {
  properties: {
    productImages: {
      type: 'array',
      minItems: 1,
      items: { type: 'string', format: 'binary' },
    },
  },
  required: ['productImages'],
});

export class CreateProductDto extends createZodDto(CreateProductDtoSchema) {}
