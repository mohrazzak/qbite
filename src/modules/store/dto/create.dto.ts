import { createZodDto } from '@anatine/zod-nestjs';
import { extendZodWithOpenApi, extendApi } from '@anatine/zod-openapi';
import { SupportedLanguages } from 'src/shared';
import * as z from 'zod';
import { StoreSchema } from 'src/generated';

extendZodWithOpenApi(z);

export const CreateStoreBaseSchema = StoreSchema.pick({
  backgroundColor: true,
  city: true,
  closingHours: true,
  country: true,
  openingHours: true,
  phoneNumber: true,
  primaryColor: true,
  secondaryColor: true,
  username: true,
}).merge(
  z.object({
    language: z.nativeEnum(SupportedLanguages),
    name: z.string(),
    description: z.string(),
    slogan: z.string().optional(),
  }),
);

const CreateStoreDtoSchema = extendApi(CreateStoreBaseSchema, {
  properties: {
    logoFile: { type: 'string', format: 'binary' },
    backgroundFile: { type: 'string', format: 'binary' },
  },
  required: ['logoFile'],
});

export class CreateStoreDto extends createZodDto(CreateStoreDtoSchema) {}
