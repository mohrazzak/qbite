import { CategorySchema } from 'src/generated';
import { createZodDto } from '@anatine/zod-nestjs';
import { z } from 'zod';
import { MultiLangFieldSchema } from 'src/modules/translate/schemas';

export const CategoryMultiLangFields = z.object({
  name: MultiLangFieldSchema,
});

export const omittedSchema = CategorySchema.omit({
  nameId: true,
  createdAt: true,
  updatedAt: true,
  deletedAt: true,
});

export const CategoryEntitySchema = omittedSchema.merge(
  CategoryMultiLangFields,
);

export class Categoryntity extends createZodDto(CategoryEntitySchema) {}
