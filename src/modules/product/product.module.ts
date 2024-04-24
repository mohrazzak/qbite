import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { cloudinaryModule } from '../cloudinary/cloudinary.module';
import { TranslateModule } from '../translate/translate.module';
import { ProductEntityMapper } from './services/entity-mapper.service';

@Module({
  imports: [cloudinaryModule, TranslateModule],
  providers: [ProductService, ProductEntityMapper],
  controllers: [ProductController],
  exports: [ProductService],
})
export class ProductModule {}
