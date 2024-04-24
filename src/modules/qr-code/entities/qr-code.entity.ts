import { QrCodeSchema } from 'src/generated';
import { createZodDto } from '@anatine/zod-nestjs';

export class QrCodeEntity extends createZodDto(QrCodeSchema) {}
