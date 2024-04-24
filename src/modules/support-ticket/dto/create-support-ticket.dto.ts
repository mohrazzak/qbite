import { createZodDto } from '@anatine/zod-nestjs';
import { extendApi, extendZodWithOpenApi } from '@anatine/zod-openapi';
import * as z from 'zod';
import { SupportTicketEntitySchema } from '../entities/support-ticket.entity';

extendZodWithOpenApi(z);

const CreateSupportTicketDtoSchema = SupportTicketEntitySchema.omit({
  id: true,
  images: true,
});

export const CreateStoreDtoSchema = extendApi(CreateSupportTicketDtoSchema, {
  properties: {
    images: {
      type: 'array',
      items: { type: 'string', format: 'binary' },
    },
  },
});

export class CreateSupportTicketDto extends createZodDto(
  CreateStoreDtoSchema,
) {}
