import {
  AppResponseSchema,
  ReturnedResponseSchema,
} from 'src/shared/interfaces/response.interface';
import { createZodDto } from '@anatine/zod-nestjs';
import { z } from 'zod';
import { SupportTicketEntitySchema } from '../entities/support-ticket.entity';

export const GetSupportTicketSchema = z.object({
  supportTicket: SupportTicketEntitySchema,
});

export const ReturnedSupportTicketResponseSchema = ReturnedResponseSchema.merge(
  z.strictObject({ data: GetSupportTicketSchema }),
);

export const AppSupportTicketResponseSchema = AppResponseSchema.merge(
  z.object({ data: GetSupportTicketSchema }),
);

export class AppSupportTicketResponse extends createZodDto(
  AppSupportTicketResponseSchema,
) {}

export class ReturnedSupportTicketResponse extends createZodDto(
  ReturnedSupportTicketResponseSchema,
) {}
