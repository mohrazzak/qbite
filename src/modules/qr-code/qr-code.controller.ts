import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseIntPipe,
  Put,
  UseGuards,
} from '@nestjs/common';
import { QrCodeService } from './qr-code.service';
import { CreateQrCodeDto } from './dto/create-qr-code.dto';
import { UpdateQrCodeDto } from './dto/update-qr-code.dto';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { I18nHeader } from 'src/core/decorators';
import { AuthGuard, RoleGuard } from 'src/core';
import { Role } from '@prisma/client';
import {
  AppQrCodeResponse,
  ReturnedQrCodeResponse,
} from './response/get-one.response';
import {
  AppResponse,
  ReturnedResponse,
} from 'src/shared/interfaces/response.interface';
import { I18n, I18nContext } from 'nestjs-i18n';
import { I18nTranslations } from 'src/generated';

@Controller('qr-code')
@ApiTags('Qr Code')
@I18nHeader()
@UseGuards(AuthGuard)
@ApiBearerAuth()
@UseGuards(new RoleGuard([Role.STORE_OWNER]))
export class QrCodeController {
  constructor(private readonly qrCodeService: QrCodeService) {}

  @Post(':storeId')
  @ApiParam({ name: 'storeId', description: 'Store ID' })
  @ApiOkResponse({
    description: 'Create a single QR Code by Store ID.',
    type: AppQrCodeResponse,
  })
  async create(
    @Body() createQrCodeDto: CreateQrCodeDto,
    @Param('storeId', ParseIntPipe) storeId: number,
    @I18n() i18n: I18nContext<I18nTranslations>,
  ): Promise<ReturnedQrCodeResponse> {
    const qrCode = await this.qrCodeService.create(createQrCodeDto, storeId);
    return {
      data: {
        qrCode,
      },
      message: i18n.t('shared.success.ability.create', {
        args: { entity: 'QrCode' },
      }),
      statusCode: 200,
    };
  }

  @Get(':storeId')
  @ApiParam({ name: 'storeId', description: 'Store ID' })
  @ApiOkResponse({
    description: 'Get a single QR Code by Store ID.',
    type: AppQrCodeResponse,
  })
  async findOne(
    @Param('storeId', ParseIntPipe) storeId: number,
    @I18n() i18n: I18nContext<I18nTranslations>,
  ): Promise<ReturnedQrCodeResponse> {
    const qrCode = await this.qrCodeService.findOneByStoreId(storeId);
    return {
      data: {
        qrCode,
      },
      message: i18n.t('shared.success.ability.getOne', {
        args: { entity: 'QrCode' },
      }),
      statusCode: 200,
    };
  }

  @Put(':qrCodeId')
  @ApiParam({ name: 'qrCodeId' })
  @ApiOkResponse({
    description: 'QrCode updated successfully.',
    type: AppQrCodeResponse,
  })
  async update(
    @Param('qrCodeId', ParseIntPipe) qrCodeId: number,
    @Body() updateQrCodeDto: UpdateQrCodeDto,
    @I18n() i18n: I18nContext<I18nTranslations>,
  ): Promise<ReturnedQrCodeResponse> {
    const qrCode = await this.qrCodeService.update(qrCodeId, updateQrCodeDto);

    return {
      data: {
        qrCode,
      },
      message: i18n.t('shared.success.ability.update', {
        args: { entity: 'QrCode' },
      }),
      statusCode: 200,
    };
  }

  @Delete(':qrCodeId')
  @ApiParam({ name: 'qrCodeId' })
  @ApiOkResponse({
    description: 'QrCode deleted successfully.',
    type: AppResponse,
  })
  async remove(
    @Param('qrCodeId', ParseIntPipe) qrCodeId: number,
    @I18n() i18n: I18nContext<I18nTranslations>,
  ): Promise<ReturnedResponse> {
    await this.qrCodeService.remove(qrCodeId);

    return {
      message: i18n.t('shared.success.ability.delete', {
        args: { entity: 'QrCode' },
      }),
      statusCode: 200,
    };
  }
}
