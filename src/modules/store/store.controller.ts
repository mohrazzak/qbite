import {
  Body,
  Controller,
  HttpStatus,
  Get,
  Post,
  Put,
  Delete,
  Param,
  UseGuards,
  UseInterceptors,
  UploadedFiles,
  ParseIntPipe,
} from '@nestjs/common';
import { StoreService } from './store.service';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { CreateStoreDto, UpdateStoreDto } from './dto';
import { Role } from 'src/generated/zod/enums';
import { AuthGuard, FilesValidation, RoleGuard } from 'src/core';
import { I18nHeader, UserId } from 'src/core/decorators';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { CreateStoreFiles, UpdateStoreFiles } from './interfaces';
import { multerLimits } from '../cloudinary/local-file.storage';
import { I18n, I18nContext } from 'nestjs-i18n';
import { I18nTranslations } from 'src/generated';
import { PrismaService } from '../prisma/prisma.service';
import {
  AppResponse,
  ReturnedResponse,
} from 'src/shared/interfaces/response.interface';
import { StoreOwnerGuard } from './guards';
import {
  AppFullStoreResponse,
  AppStoreResponse,
  ReturnedFullStoreResponse,
  ReturnedStoreResponse,
} from './responses';

@ApiTags('Stores')
@I18nHeader()
@Controller('stores')
export class StoreController {
  constructor(
    private readonly storeService: StoreService,
    private readonly prismaService: PrismaService,
  ) {}

  // @Get()
  // @ApiOkResponse({
  //   description: 'Get all Store owner stores.',
  //   type: AppGetAllStoresResponse,
  // })
  // async getAll(
  //   @UserId() userId: number,
  //   @I18n() i18n: I18nContext<I18nTranslations>,
  // ): Promise<ReturnedGetAllStoresResponse> {
  //   const stores = await this.storeService.getAll(
  //     userId,
  //     i18n.lang as SupportedLanguages,
  //   );
  //   return {
  //     data: { stores },
  //     message: i18n.t('shared.success.getAll', { args: { entity: 'Store' } }),
  //     statusCode: HttpStatus.OK,
  //   };
  // }

  @Get(':storeId')
  @ApiParam({ name: 'storeId', description: 'Store ID' })
  @ApiOkResponse({
    description: 'Get a single store by ID.',
    type: AppStoreResponse,
  })
  async getOne(
    @Param('storeId', ParseIntPipe) storeId: number,
    @I18n() i18n: I18nContext<I18nTranslations>,
  ): Promise<ReturnedStoreResponse> {
    const store = await this.storeService.getOne(storeId);
    return {
      data: { store },
      message: i18n.t('shared.success.getOne', { args: { entity: 'Store' } }),
      statusCode: HttpStatus.OK,
    };
  }

  @Get('by-username/:username')
  @ApiParam({ name: 'username', description: 'Store Username' })
  @ApiOkResponse({
    description: 'Get a single store with all its related data by Username.',
    type: AppFullStoreResponse,
  })
  async getOneByUsername(
    @Param('username') username: string,
    @I18n() i18n: I18nContext<I18nTranslations>,
  ): Promise<ReturnedFullStoreResponse> {
    const { store, products } =
      await this.storeService.getOneByUsername(username);
    return {
      data: { store, products },
      message: i18n.t('shared.success.getOne', { args: { entity: 'Store' } }),
      statusCode: HttpStatus.OK,
    };
  }

  @Post()
  @ApiCreatedResponse({
    description: 'Create a store by store owner.',
    type: AppStoreResponse,
  })
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'backgroundFile', maxCount: 1 },
        { name: 'logoFile', maxCount: 1 },
      ],
      multerLimits,
    ),
  )
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @UseGuards(new RoleGuard([Role.STORE_OWNER]))
  @ApiConsumes('multipart/form-data')
  async create(
    @UserId() userId: number,
    @Body() dto: CreateStoreDto,
    @I18n()
    i18n: I18nContext<I18nTranslations>,
    @UploadedFiles(
      new FilesValidation([
        { name: 'logoFile', required: true },
        { name: 'backgroundFile', required: false },
      ]),
    )
    files: CreateStoreFiles,
  ): Promise<ReturnedStoreResponse> {
    const store = await this.storeService.create(userId, dto, files);
    return {
      data: { store },
      message: i18n.t('shared.success.create', { args: { entity: 'Store' } }),
      statusCode: HttpStatus.CREATED,
    };
  }

  @Put(':storeId')
  // @UseGuards(StoreOwnerGuard)
  @ApiParam({ name: 'storeId' })
  @ApiOkResponse({
    description: 'Store updated successfully.',
    type: AppStoreResponse,
  })
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'backgroundFile', maxCount: 1 },
        { name: 'logoFile', maxCount: 1 },
      ],
      multerLimits,
    ),
  )
  @ApiConsumes('multipart/form-data')
  async update(
    @Param('storeId', ParseIntPipe) storeId: number,
    @Body() dto: UpdateStoreDto,
    @UploadedFiles()
    files: UpdateStoreFiles,
    @I18n() i18n: I18nContext<I18nTranslations>,
  ): Promise<ReturnedStoreResponse> {
    const store = await this.storeService.update(storeId, dto, files);
    return {
      data: { store },
      message: i18n.t('shared.success.update', { args: { entity: 'Store' } }),
      statusCode: HttpStatus.OK,
    };
  }

  @Delete(':storeId')
  @UseGuards(StoreOwnerGuard)
  @ApiParam({ name: 'storeId' })
  @ApiOkResponse({
    description: 'Store deleted successfully.',
    type: AppResponse,
  })
  async delete(
    @Param('storeId', ParseIntPipe) storeId: number,
    @I18n() i18n: I18nContext<I18nTranslations>,
  ): Promise<ReturnedResponse> {
    await this.storeService.delete(storeId);
    return {
      message: i18n.t('shared.success.delete', { args: { entity: 'Store' } }),
      statusCode: HttpStatus.OK,
    };
  }
}
