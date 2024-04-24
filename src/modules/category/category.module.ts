import { Module } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { TranslateModule } from '../translate/translate.module';

@Module({
  imports: [TranslateModule],
  controllers: [CategoryController],
  providers: [CategoryService],
})
export class CategoryModule {}
