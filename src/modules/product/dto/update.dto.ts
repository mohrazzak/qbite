import { createZodDto } from '@anatine/zod-nestjs';
import { extendZodWithOpenApi, extendApi } from '@anatine/zod-openapi';
import { ProductImagesSchema, ProductSchema } from 'src/generated';
import { MultiLangFieldSchema } from 'src/modules/translate/schemas';
import * as z from 'zod';

extendZodWithOpenApi(z);

const baseSchema = ProductSchema.pick({
  slug: true,
  categoryId: true,
})
  .merge(
    z.object({
      prices: z.array(
        z.object({
          id: z.coerce.number().optional(),
          currencyId: z.coerce.number(),
          price: z.coerce.number(),
        }),
      ),
      defaultImgIndex: z.coerce.number(),
      images: z.array(
        ProductImagesSchema.pick({
          id: true,
          imageURL: true,
          isDefault: true,
          isVisible: true,
        }),
      ),
      details: z.array(
        z.object({
          productDetailsId: z.coerce.number(),
          value: z.string(),
        }),
      ),
      name: MultiLangFieldSchema,
      description: MultiLangFieldSchema,
    }),
  )
  .required({ defaultImgIndex: true });

const UpdateProductDtoSchema = extendApi(baseSchema, {
  properties: {
    productImages: {
      type: 'array',
      items: { type: 'string', format: 'binary' },
    },
  },
  required: ['productImages'],
});

export class UpdateProductDto extends createZodDto(UpdateProductDtoSchema) {}
