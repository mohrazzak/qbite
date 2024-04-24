import { Module } from '@nestjs/common';
import { StoreOwnerController } from './store-owner.controller';
import { StoreOwnerService } from './store-owner.service';
import { PrismaModule } from '../prisma/prisma.module';
import { StoreOwnerEntityMapper } from './services/entity-mapper.service';
import { MailerModule } from './auth/mailer/mailer.module';

@Module({
  imports: [PrismaModule, MailerModule],
  controllers: [StoreOwnerController],
  providers: [StoreOwnerService, StoreOwnerEntityMapper],
  exports: [StoreOwnerService, StoreOwnerEntityMapper],
})
export class StoreOwnerModule {}
