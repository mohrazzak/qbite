import { Module } from '@nestjs/common';
import { StoreOwnerAuthService } from './auth.service';
import { StoreOwnerAuthController } from './auth.controller';
import { PrismaModule } from 'src/modules/prisma/prisma.module';
import { MailerModule } from 'src/modules/store-owner/auth/mailer/mailer.module';
import { StoreOwnerModule } from '../store-owner.module';

@Module({
  imports: [PrismaModule, StoreOwnerAuthModule, MailerModule, StoreOwnerModule],
  providers: [StoreOwnerAuthService],
  controllers: [StoreOwnerAuthController],
})
export class StoreOwnerAuthModule {}
