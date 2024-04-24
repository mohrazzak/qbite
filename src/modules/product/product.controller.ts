import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiConsumes,
  ApiCreatedResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { multerLimits } from '../cloudinary/local-file.storage';
import { I18n, I18nContext } from 'nestjs-i18n';
import { I18nTranslations } from 'src/generated';
import { FilesValidation } from 'src/core';
import { CreateProductDto } from './dto';
import { CreateProductFiles } from './types/create-product-files.type';
import { ProductService } from './product.service';
import {
  AppProductResponse,
  ReturnedProductResponse,
} from './responses/get-one.response';
import { UpdateProductDto } from './dto/update.dto';
import {
  AppGetAllProductsResponse,
  ReturnedGetAllProductsResponse,
} from './responses';
import { I18nHeader } from 'src/core/decorators';
import {
  AppDeleteProductResponse,
  ReturnedDeleteProductResponse,
} from './responses/delete.response';
@Controller('product')
@ApiTags('Products')
@I18nHeader()
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('by-store/:storeId')
  @ApiCreatedResponse({
    description: 'Get all store products by store id.',
    type: AppGetAllProductsResponse,
  })
  @ApiConsumes('multipart/form-data')
  @ApiParam({ name: 'storeId' })
  async getAll(
    @Param('storeId', ParseIntPipe) storeId: number,
    @I18n()
    i18n: I18nContext<I18nTranslations>,
  ): Promise<ReturnedGetAllProductsResponse> {
    const products = await this.productService.getAll(storeId);

    return {
      data: { products },
      message: i18n.t('shared.success.ability.getAll', {
        args: { entity: 'Product' },
      }),
      statusCode: 200,
    };
  }

  @Get(':productId')
  @ApiCreatedResponse({
    description: 'Create a store by store owner.',
    type: AppProductResponse,
  })
  @ApiConsumes('multipart/form-data')
  @ApiParam({ name: 'productId', description: 'Product ID' })
  async getOne(
    @I18n()
    i18n: I18nContext<I18nTranslations>,
    @Param('productId', ParseIntPipe) productId: number,
  ): Promise<ReturnedProductResponse> {
    const product = await this.productService.getOne(productId);

    return {
      data: { product },
      message: i18n.t('shared.success.ability.getOne', {
        args: { entity: 'Product' },
      }),
      statusCode: 200,
    };
  }

  @Post()
  @ApiCreatedResponse({
    description: 'Create a store by store owner.',
    type: AppProductResponse,
  })
  @UseInterceptors(
    FileFieldsInterceptor([{ name: 'productImages' }], multerLimits),
  )
  @ApiConsumes('multipart/form-data')
  async create(
    @Body() dto: CreateProductDto,
    @I18n()
    i18n: I18nContext<I18nTranslations>,
    @UploadedFiles(
      new FilesValidation([{ name: 'productImages', required: true }]),
    )
    files: CreateProductFiles,
  ): Promise<ReturnedProductResponse> {
    const product = await this.productService.create(dto, files);
    return {
      data: { product },
      message: i18n.t('shared.success.ability.create', {
        args: { entity: 'Product' },
      }),
      statusCode: 200,
    };
  }

  @Put(':productId')
  @ApiCreatedResponse({
    description: 'Update a store by store owner.',
    type: AppProductResponse,
  })
  @UseInterceptors(
    FileFieldsInterceptor([{ name: 'productImages' }], multerLimits),
  )
  @ApiConsumes('multipart/form-data')
  @ApiParam({ name: 'productId' })
  async update(
    @Param('productId', ParseIntPipe) productId: number,
    @Body() dto: UpdateProductDto,
    @I18n()
    i18n: I18nContext<I18nTranslations>,
    @UploadedFiles(
      new FilesValidation([{ name: 'productImages', required: false }]),
    )
    files: CreateProductFiles,
  ): Promise<ReturnedProductResponse> {
    console.log(files);
    const product = await this.productService.update(productId, dto, files);

    return { data: { product }, message: '', statusCode: 200 };
  }

  @Delete(':productId')
  @ApiCreatedResponse({
    description: 'Delete a store by store owner.',
    type: AppDeleteProductResponse,
  })
  @ApiConsumes('multipart/form-data')
  @ApiParam({ name: 'productId' })
  async delete(
    @Param('productId', ParseIntPipe) productId: number,
    @I18n()
    i18n: I18nContext<I18nTranslations>,
  ): Promise<ReturnedDeleteProductResponse> {
    const product = await this.productService.delete(productId);

    return {
      message: i18n.t('shared.success.ability.delete', {
        args: { entity: 'Product' },
      }),
      data: { product },
      statusCode: 200,
    };
  }
}
