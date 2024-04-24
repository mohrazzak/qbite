import { Module } from '@nestjs/common';
import { ProductDetailController } from './detail.controller';
import { ProductDetailService } from './detail.service';
import { TranslateModule } from 'src/modules/translate/translate.module';

@Module({
  imports: [TranslateModule],
  controllers: [ProductDetailController],
  providers: [ProductDetailService],
})
export class ProductDetailModule {}
