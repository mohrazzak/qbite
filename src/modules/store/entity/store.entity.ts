import { StoreSchema } from 'src/generated';
import { createZodDto } from '@anatine/zod-nestjs';
import { z } from 'zod';
import { MultiLangFieldSchema } from 'src/modules/translate/schemas';

const newMultiLangFields = z.object({
  name: MultiLangFieldSchema,
  description: MultiLangFieldSchema,
  slogan: MultiLangFieldSchema.or(z.null()),
});

export const omittedSchema = StoreSchema.pick({
  backgroundColor: true,
  backgroundURL: true,
  city: true,
  closingHours: true,
  country: true,
  id: true,
  isPhoneNumberVerified: true,
  logoURL: true,
  openingHours: true,
  phoneNumber: true,
  primaryColor: true,
  secondaryColor: true,
  username: true,
});

export const StoreEntitySchema = omittedSchema.merge(newMultiLangFields);

export class StoreEntity extends createZodDto(StoreEntitySchema) {}
