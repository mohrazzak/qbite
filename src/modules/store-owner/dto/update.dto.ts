import { createZodDto } from '@anatine/zod-nestjs';
import { StoreOwnerSchema } from 'src/generated';

export class StoreOwnerUpdateDto extends createZodDto(
  StoreOwnerSchema.pick({
    country: true,
    city: true,
    countryCode: true,
    firstName: true,
    lastName: true,
    phoneNumber: true,
  }).strict(),
) {}
