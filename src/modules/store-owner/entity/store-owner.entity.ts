import { StoreOwnerSchema, StoreSchema } from 'src/generated';
import { createZodDto } from '@anatine/zod-nestjs';
import { z } from 'zod';

export const StoreOwnerEntitySchema = StoreOwnerSchema.pick({
  id: true,
  email: true,
  firstName: true,
  lastName: true,
  phoneNumber: true,
  isPhoneNumberActive: true,
  country: true,
  city: true,
  isActive: true,
});

export class StoreOwnerEntity extends createZodDto(StoreOwnerEntitySchema) {}

export const StoreOwnerSignInEntitySchema = StoreOwnerSchema.pick({
  id: true,
  email: true,
  firstName: true,
  lastName: true,
  phoneNumber: true,
  isPhoneNumberActive: true,
  country: true,
  city: true,
  isActive: true,
}).merge(z.object({ stores: z.array(StoreSchema.pick({ id: true })) }));

export class StoreOwnerSignInEntity extends createZodDto(
  StoreOwnerSignInEntitySchema,
) {}
