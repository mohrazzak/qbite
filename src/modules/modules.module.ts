import { Module } from '@nestjs/common';
import { StoreOwnerModule } from './store-owner/store-owner.module';
import { StoreOwnerAuthModule } from './store-owner/auth/auth.module';
import { StoreModule } from './store/store.module';
import { cloudinaryModule } from './cloudinary/cloudinary.module';
import { TranslateModule } from './translate/translate.module';
import { ProductModule } from './product/product.module';
import { CategoryModule } from './category/category.module';
import { CategoryService } from './category/category.service';
import { PlanModule } from './subscription/plan.module';
import { ProductDetailModule } from './product/detail/detail.module';
import { QrCodeModule } from './qr-code/qr-code.module';
import { CurrencyModule } from './currency/currency.module';
import { SupportTicketModule } from './support-ticket/support-ticket.module';
import { BackupModule } from './backup/backup.module';

@Module({
  imports: [
    StoreOwnerModule,
    StoreOwnerAuthModule,
    StoreModule,
    cloudinaryModule,
    TranslateModule,
    ProductModule,
    ProductDetailModule,
    CategoryModule,
    PlanModule,
    QrCodeModule,
    CurrencyModule,
    SupportTicketModule,
    BackupModule,
  ],
  providers: [CategoryService],
})
export class ModulesModule {}
