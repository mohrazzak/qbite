import {
  AppResponseSchema,
  ReturnedResponseSchema,
} from 'src/shared/interfaces/response.interface';
import { createZodDto } from '@anatine/zod-nestjs';
import { z } from 'zod';
import { SupportTicketEntitySchema } from '../entities/support-ticket.entity';

export const GetSupportTicketsSchema = z.object({
  supportTickets: z.array(SupportTicketEntitySchema),
});

export const ReturnedSupportTicketsResponseSchema =
  ReturnedResponseSchema.merge(
    z.strictObject({ data: GetSupportTicketsSchema }),
  );

export const AppGetAllSupportTicketsResponseSchema = AppResponseSchema.merge(
  z.object({ data: GetSupportTicketsSchema }),
);

export class AppGetAllSupportTicketsResponse extends createZodDto(
  AppGetAllSupportTicketsResponseSchema,
) {}

export class ReturnedGetAllSupportTicketsResponse extends createZodDto(
  ReturnedSupportTicketsResponseSchema,
) {}
