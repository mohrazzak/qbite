import { Module } from '@nestjs/common';
import { StoreController } from './store.controller';
import { StoreService } from './store.service';
import { cloudinaryModule } from '../cloudinary/cloudinary.module';
import { TranslateModule } from '../translate/translate.module';
import { StoreEntityMapper } from './services/entity-mapper.service';
import { ProductModule } from '../product/product.module';

@Module({
  imports: [cloudinaryModule, TranslateModule, ProductModule],
  controllers: [StoreController],
  providers: [StoreService, StoreEntityMapper],
  exports: [StoreService, StoreEntityMapper],
})
export class StoreModule {}
