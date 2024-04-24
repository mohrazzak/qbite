import { createZodDto } from '@anatine/zod-nestjs';
import {
  AppResponseSchema,
  ReturnedResponseSchema,
} from 'src/shared/interfaces/response.interface';
import { z } from 'zod';
import { PlanEntitySchema } from '../entity';

export const planData = z.object({
  plans: z.array(PlanEntitySchema),
});

export const ReturnedGetAllPlansResponseSchema = ReturnedResponseSchema.merge(
  z.strictObject({ data: planData }),
);

export const AppGetAllPlansResponseSchema = AppResponseSchema.merge(
  z.object({ data: planData }),
);

export class ReturnedGetAllPlansResponse extends createZodDto(
  ReturnedGetAllPlansResponseSchema,
) {}
export class AppGetAllPlansResponse extends createZodDto(
  AppGetAllPlansResponseSchema,
) {}
