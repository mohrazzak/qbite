import { StoreOwnerSchema } from 'src/generated';
import { createZodDto } from '@anatine/zod-nestjs';

export class StoreOwnerModel extends createZodDto(StoreOwnerSchema) {}
