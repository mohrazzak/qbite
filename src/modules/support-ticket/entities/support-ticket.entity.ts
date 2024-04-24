import { SupportTicketImagesSchema, SupportTicketSchema } from 'src/generated';
import { createZodDto } from '@anatine/zod-nestjs';
import { z } from 'zod';

export const SupportTicketEntitySchema = SupportTicketSchema.pick({
  id: true,
  subject: true,
  description: true,
  storeId: true,
}).merge(z.object({ images: z.array(SupportTicketImagesSchema) }));

export class SupportTicketEntity extends createZodDto(
  SupportTicketEntitySchema,
) {}
