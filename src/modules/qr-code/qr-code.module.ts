import { Module } from '@nestjs/common';
import { QrCodeService } from './qr-code.service';
import { QrCodeController } from './qr-code.controller';
import { cloudinaryModule } from '../cloudinary/cloudinary.module';

@Module({
  imports: [cloudinaryModule],
  controllers: [QrCodeController],
  providers: [QrCodeService],
  exports: [QrCodeService],
})
export class QrCodeModule {}
