import { ProductDetailsSchema } from 'src/generated';
import { createZodDto } from '@anatine/zod-nestjs';
import { z } from 'zod';
import { MultiLangFieldSchema } from 'src/modules/translate/schemas';

export const DetailMultiLangFields = z.object({
  unit: MultiLangFieldSchema,
});

export const omittedSchema = ProductDetailsSchema.omit({
  unitId: true,
  createdAt: true,
  updatedAt: true,
  deletedAt: true,
});

export const ProductDetailEntitySchema = omittedSchema.merge(
  DetailMultiLangFields,
);

export class ProductDetailEntity extends createZodDto(
  ProductDetailEntitySchema,
) {}
