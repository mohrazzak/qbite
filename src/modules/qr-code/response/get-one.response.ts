import {
  AppResponseSchema,
  ReturnedResponseSchema,
} from 'src/shared/interfaces/response.interface';
import { createZodDto } from '@anatine/zod-nestjs';
import { z } from 'zod';
import { QrCodeSchema, StoreSchema } from 'src/generated';

const QrCodeSchemaWithLogoURL = QrCodeSchema.merge(
  z.object({ store: StoreSchema.pick({ logoURL: true }) }),
);

export const GetQrCodeSchema = z.object({
  qrCode: QrCodeSchemaWithLogoURL,
});

export const ReturnedQrCodeResponseSchema = ReturnedResponseSchema.merge(
  z.strictObject({ data: GetQrCodeSchema }),
);

export const AppQrCodeResponseSchema = AppResponseSchema.merge(
  z.object({ data: GetQrCodeSchema }),
);

export class AppQrCodeResponse extends createZodDto(AppQrCodeResponseSchema) {}

export class ReturnedQrCodeResponse extends createZodDto(
  ReturnedQrCodeResponseSchema,
) {}
