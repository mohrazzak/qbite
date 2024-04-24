import { StoreSchema } from 'src/generated';
import { createZodDto } from '@anatine/zod-nestjs';

export class StoreModel extends createZodDto(StoreSchema) {}
