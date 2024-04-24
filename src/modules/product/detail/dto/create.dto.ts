import { createZodDto } from '@anatine/zod-nestjs';
import { extendZodWithOpenApi } from '@anatine/zod-openapi';
import { SupportedLanguages } from 'src/shared';
import * as z from 'zod';
import { ProductDetailsSchema } from 'src/generated';

extendZodWithOpenApi(z);

export const CreateProductDetailBaseSchema = ProductDetailsSchema.pick({
  icon: true,
  storeId: true,
}).merge(
  z.object({
    language: z.nativeEnum(SupportedLanguages),
    detail: z.string(),
  }),
);

export class CreateProductDetailDto extends createZodDto(
  CreateProductDetailBaseSchema,
) {}
