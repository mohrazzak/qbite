import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { I18n, I18nContext } from 'nestjs-i18n';
import { I18nTranslations } from 'src/generated';
import {
  AppProductDetailResponse,
  ReturnedProductDetailResponse,
} from './responses/get-one.response';
import { ProductDetailService } from './detail.service';
import {
  AppGetAllProductDetailsResponse,
  ReturnedGetAllProductDetailsResponse,
} from './responses/get-all.response';
import { CreateProductDetailDto } from './dto';
import { UpdateProductDetailDto } from './dto/update.dto';
import {
  AppResponse,
  ReturnedResponse,
} from 'src/shared/interfaces/response.interface';
import { I18nHeader } from 'src/core/decorators';

@Controller('product/detail')
@ApiTags('product details')
@I18nHeader()
export class ProductDetailController {
  constructor(private readonly productDetailService: ProductDetailService) {}

  @Get(':storeId')
  @ApiCreatedResponse({
    description: 'Get the public and store related detail',
    type: AppGetAllProductDetailsResponse,
  })
  @ApiParam({ name: 'storeId' })
  async getAll(
    @I18n()
    i18n: I18nContext<I18nTranslations>,
    @Param('storeId', ParseIntPipe) storeId: number,
  ): Promise<ReturnedGetAllProductDetailsResponse> {
    const details =
      await this.productDetailService.getGlobalAndStoreRelated(storeId);

    return { data: { details }, message: '', statusCode: 200 };
  }

  @Post()
  @ApiCreatedResponse({
    description: 'create a product detail linked to your store',
    type: AppProductDetailResponse,
  })
  async create(
    @I18n()
    i18n: I18nContext<I18nTranslations>,
    @Body() dto: CreateProductDetailDto,
  ): Promise<ReturnedProductDetailResponse> {
    const detail = await this.productDetailService.createStoreRelated(dto);
    return { data: { detail }, message: '', statusCode: 200 };
  }

  @Put(':detailId')
  @ApiCreatedResponse({
    description: 'update a product detail linked to your store',
    type: AppProductDetailResponse,
  })
  @ApiParam({ name: 'detailId' })
  async update(
    @I18n()
    i18n: I18nContext<I18nTranslations>,
    @Body() dto: UpdateProductDetailDto,
    @Param('detailId', ParseIntPipe) detailId: number,
  ): Promise<ReturnedProductDetailResponse> {
    const detail = await this.productDetailService.updateStoreRelated(
      detailId,
      dto,
    );

    return { data: { detail }, message: '', statusCode: 200 };
  }

  @Delete(':detailId')
  @ApiCreatedResponse({
    description: 'delete a product detail linked to your store',
    type: AppResponse,
  })
  @ApiParam({ name: 'detailId' })
  async delete(
    @I18n()
    i18n: I18nContext<I18nTranslations>,
    @Param('detailId', ParseIntPipe) detailId: number,
  ): Promise<ReturnedResponse> {
    await this.productDetailService.delete(detailId);

    return { message: '', statusCode: 200 };
  }
}
