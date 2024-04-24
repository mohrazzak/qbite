import { createZodDto } from '@anatine/zod-nestjs';
import { extendZodWithOpenApi } from '@anatine/zod-openapi';
import * as z from 'zod';
import { QrCodeSchema } from 'src/generated';

extendZodWithOpenApi(z);

export const CreateQrCodeSchema = QrCodeSchema.omit({
  id: true,
  storeId: true,
});

export class CreateQrCodeDto extends createZodDto(CreateQrCodeSchema) {}
