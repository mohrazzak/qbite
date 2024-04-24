import { PlanSchema, PlanVersionSchema } from 'src/generated';
import { createZodDto } from '@anatine/zod-nestjs';
import { z } from 'zod';

export const omittedSchema = PlanSchema.omit({
  createdAt: true,
  updatedAt: true,
  deletedAt: true,
});

export const joins = z.object({
  versions: z.array(PlanVersionSchema),
});

export const PlanEntitySchema = omittedSchema.merge(joins);

export class PlanEntity extends createZodDto(PlanEntitySchema) {}
