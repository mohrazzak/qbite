import {
  CategorySchema,
  DetailsOnProductSchema,
  ProductPricesSchema,
  ProductSchema,
} from 'src/generated';
import { createZodDto } from '@anatine/zod-nestjs';
import { z } from 'zod';

import { MultiLangFieldSchema } from 'src/modules/translate/schemas';

export const ProductMultiLangFields = z.object({
  name: MultiLangFieldSchema,
  description: MultiLangFieldSchema,
});

const relationalJoins = z.object({
  prices: z.array(ProductPricesSchema.omit({ productId: true })),
  details: z.array(
    z.object({
      value: DetailsOnProductSchema.shape.value,
      productDetails: z.object({
        unit: MultiLangFieldSchema,
      }),
    }),
  ),
  category: CategorySchema.pick({ id: true, icon: true })
    .merge(z.object({ name: MultiLangFieldSchema }))
    .nullable(),
});

export const omittedSchema = ProductSchema.omit({
  nameId: true,
  descriptionId: true,
  createdAt: true,
  updatedAt: true,
  deletedAt: true,
});

export const ProductEntitySchema = omittedSchema
  .merge(ProductMultiLangFields)
  .merge(relationalJoins);

export class ProductEntity extends createZodDto(ProductEntitySchema) {}
