import { createZodDto } from '@anatine/zod-nestjs';
import * as z from 'zod';
import { extendZodWithOpenApi } from '@anatine/zod-openapi';
import { CreateQrCodeSchema } from './create-qr-code.dto';

extendZodWithOpenApi(z);

const baseSchema = CreateQrCodeSchema.partial();

export class UpdateQrCodeDto extends createZodDto(baseSchema) {}
