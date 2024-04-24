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
  AppCategoryResponse,
  AppGetAllCategoriesResponse,
  ReturnedCategoryResponse,
  ReturnedGetAllCategoriesResponse,
} from './responses';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto';
import { UpdateCategoryDto } from './dto/update.dto';
import { I18nHeader } from 'src/core/decorators';
import {
  AppDeleteCategoryResponse,
  ReturnedDeleteCategoryResponse,
} from './responses/delete.response';

@Controller('category')
@ApiTags('Category')
@I18nHeader()
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get('by-store/:storeId')
  @ApiCreatedResponse({
    description: 'Get all store products by store id.',
    type: AppGetAllCategoriesResponse,
  })
  @ApiParam({ name: 'storeId' })
  async getAll(
    @Param('storeId', ParseIntPipe) storeId: number,
    @I18n()
    i18n: I18nContext<I18nTranslations>,
  ): Promise<ReturnedGetAllCategoriesResponse> {
    const categories = await this.categoryService.getAllByStoreId(storeId);

    return {
      data: { categories },
      message: i18n.t('shared.success.getAll', {
        args: { entity: 'Category' },
      }),
      statusCode: 200,
    };
  }

  @Get(':categoryId')
  @ApiCreatedResponse({
    description: 'Create a store by store owner.',
    type: AppCategoryResponse,
  })
  @ApiParam({ name: 'categoryId' })
  async getOne(
    @I18n()
    i18n: I18nContext<I18nTranslations>,
    @Param('categoryId', ParseIntPipe) categoryId: number,
  ): Promise<ReturnedCategoryResponse> {
    const category = await this.categoryService.getOne(categoryId);

    return {
      data: { category },
      message: i18n.t('shared.success.getOne', {
        args: { entity: 'Category' },
      }),
      statusCode: 200,
    };
  }

  @Post()
  @ApiCreatedResponse({
    description: 'Create a store by store owner.',
    type: AppCategoryResponse,
  })
  async create(
    @Body() dto: CreateCategoryDto,
    @I18n()
    i18n: I18nContext<I18nTranslations>,
  ): Promise<ReturnedCategoryResponse> {
    const category = await this.categoryService.create(dto);

    return {
      data: { category },
      message: i18n.t('shared.success.create', {
        args: { entity: 'Category' },
      }),
      statusCode: 200,
    };
  }

  @Put(':categoryId')
  @ApiCreatedResponse({
    description: 'Update a category.',
    type: AppCategoryResponse,
  })
  @ApiParam({ name: 'categoryId' })
  async update(
    @Param('categoryId', ParseIntPipe) categoryId: number,
    @Body() dto: UpdateCategoryDto,
    @I18n()
    i18n: I18nContext<I18nTranslations>,
  ): Promise<ReturnedCategoryResponse> {
    const category = await this.categoryService.update(categoryId, dto);

    return {
      data: { category },
      message: i18n.t('shared.success.update', {
        args: { entity: 'Category' },
      }),
      statusCode: 200,
    };
  }

  @Delete(':categoryId')
  @ApiCreatedResponse({
    description: 'Delete a store by store owner.',
    type: AppDeleteCategoryResponse,
  })
  async delete(
    @Param('categoryId', ParseIntPipe) categoryId: number,
    @I18n()
    i18n: I18nContext<I18nTranslations>,
  ): Promise<ReturnedDeleteCategoryResponse> {
    const category = await this.categoryService.delete(categoryId);

    return {
      message: i18n.t('shared.success.delete', {
        args: { entity: 'Category' },
      }),
      data: { category },
      statusCode: 200,
    };
  }
}
