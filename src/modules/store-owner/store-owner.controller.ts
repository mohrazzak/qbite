import {
  Controller,
  Req,
  Body,
  HttpStatus,
  UseGuards,
  Put,
  Delete,
  Get,
  ParseIntPipe,
  Patch,
} from '@nestjs/common';
import { StoreOwnerService } from './store-owner.service';
import {
  AppStoreOwnerResponse,
  ReturnedStoreOwnerResponse,
  StoreOwnerChangeEmailDto,
  StoreOwnerUpdateDto,
} from './dto';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { IAuthRequest } from 'src/shared';
import { Role } from 'src/generated/zod/enums';
import { AuthGuard, RoleGuard } from 'src/core';
import { I18n, I18nContext } from 'nestjs-i18n';
import { I18nTranslations } from 'src/generated/i18n.generated';
import { I18nHeader } from 'src/core/decorators/api';
import { ReturnedResponse } from 'src/shared/interfaces/response.interface';
import { UserId } from 'src/core/decorators';

@ApiTags('Store Owners')
@I18nHeader()
@Controller('store-owner')
export class StoreOwnerController {
  constructor(private readonly storeOwnerService: StoreOwnerService) {}

  @Get('/me')
  @ApiOkResponse({
    description: 'Updates the store owner info by replacing it with new ones',
    type: AppStoreOwnerResponse,
  })
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @UseGuards(new RoleGuard([Role.STORE_OWNER]))
  async getMe(
    @UserId(ParseIntPipe) storeOwnerId: number,
    @I18n() i18n: I18nContext<I18nTranslations>,
  ): Promise<ReturnedStoreOwnerResponse> {
    const storeOwner = await this.storeOwnerService.getOne(storeOwnerId);
    return {
      data: { storeOwner },
      message: i18n.t('shared.success.getOne', {
        args: { entity: 'StoreOwner' },
      }),
      statusCode: HttpStatus.OK,
    };
  }

  @Patch('/change-email')
  @ApiOkResponse({
    description: 'Updates the store owner email by replacing it with new one',
    type: AppStoreOwnerResponse,
  })
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @UseGuards(new RoleGuard([Role.STORE_OWNER]))
  async changeEmail(
    @UserId() userId: number,
    @Body() dto: StoreOwnerChangeEmailDto,
    @I18n() i18n: I18nContext<I18nTranslations>,
  ): Promise<ReturnedStoreOwnerResponse> {
    const storeOwner = await this.storeOwnerService.changeEmail(
      userId,
      dto.email,
    );
    return {
      data: { storeOwner },
      message: i18n.t('store-owner.success.changeEmail'),
      statusCode: HttpStatus.OK,
    };
  }

  @Put('/')
  @ApiOkResponse({
    description: 'Updates the store owner info by replacing it with new ones',
    type: AppStoreOwnerResponse,
  })
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @UseGuards(new RoleGuard([Role.STORE_OWNER]))
  async update(
    @Req() req: IAuthRequest,
    @Body() dto: StoreOwnerUpdateDto,
    @I18n() i18n: I18nContext<I18nTranslations>,
  ): Promise<ReturnedStoreOwnerResponse> {
    const storeOwner = await this.storeOwnerService.update(req.user.id, dto);
    return {
      data: { storeOwner },
      message: i18n.t('shared.success.update', {
        args: { entity: 'StoreOwner' },
      }),
      statusCode: HttpStatus.OK,
    };
  }

  @Delete('/')
  @ApiOkResponse({
    description: 'Deletes the store owner account',
    type: AppStoreOwnerResponse,
  })
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @UseGuards(new RoleGuard([Role.STORE_OWNER]))
  async delete(
    @Req() req: IAuthRequest,
    @I18n() i18n: I18nContext<I18nTranslations>,
  ): Promise<ReturnedResponse> {
    await this.storeOwnerService.delete(req.user.id);
    return {
      message: i18n.t('shared.success.delete', {
        args: { entity: 'StoreOwner' },
      }),
      statusCode: HttpStatus.OK,
    };
  }
}
