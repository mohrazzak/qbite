import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
  Put,
} from '@nestjs/common';
import { CurrencyService } from './currency.service';
import { CreateCurrencyDto } from './dto/create-currency.dto';
import { UpdateCurrencyDto } from './dto/update-currency.dto';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { I18nHeader } from 'src/core/decorators';
import { AuthGuard, RoleGuard } from 'src/core';
import { Role } from '@prisma/client';
import {
  AppCurrencyResponse,
  ReturnedCurrencyResponse,
} from './responses/get-one.response';
import {
  AppGetAllCurrenciesResponse,
  ReturnedGetAllCurrenciesResponse,
} from './responses/get-all.response';
import {
  AppResponse,
  ReturnedResponse,
} from 'src/shared/interfaces/response.interface';
import { I18nTranslations } from 'src/generated';
import { I18n, I18nContext } from 'nestjs-i18n';

@Controller('currency')
@ApiTags('currency')
@I18nHeader()
// @UseGuards(AuthGuard)
// @ApiBearerAuth()
export class CurrencyController {
  constructor(private readonly currencyService: CurrencyService) {}

  @Post()
  @ApiOkResponse({
    description: 'Create a Currency.',
    type: AppCurrencyResponse,
  })
  @UseGuards(new RoleGuard([Role.ADMIN]))
  async create(
    @Body() createCurrencyDto: CreateCurrencyDto,
    @I18n() i18n: I18nContext<I18nTranslations>,
  ): Promise<ReturnedCurrencyResponse> {
    const currency = await this.currencyService.create(createCurrencyDto);

    return {
      data: { currency },
      message: i18n.t('shared.success.ability.create', {
        args: { entity: 'Currency' },
      }),
      statusCode: 200,
    };
  }

  @Get()
  @ApiOkResponse({
    description: 'get all Currencies.',
    type: AppGetAllCurrenciesResponse,
  })
  // @UseGuards(new RoleGuard([Role.STORE_OWNER]))
  async findAll(
    @I18n() i18n: I18nContext<I18nTranslations>,
  ): Promise<ReturnedGetAllCurrenciesResponse> {
    const currencies = await this.currencyService.findAll();

    return {
      data: { currencies },
      message: i18n.t('shared.success.ability.getAll', {
        args: { entity: 'Currency' },
      }),
      statusCode: 200,
    };
  }

  @Get(':currencyId')
  @ApiOkResponse({
    description: 'get one Currencies.',
    type: AppCurrencyResponse,
  })
  @UseGuards(new RoleGuard([Role.STORE_OWNER]))
  async findOne(
    @Param('currencyId', ParseIntPipe) currencyId: number,
    @I18n() i18n: I18nContext<I18nTranslations>,
  ): Promise<ReturnedCurrencyResponse> {
    const currency = await this.currencyService.findOne(currencyId);

    return {
      data: { currency },
      message: i18n.t('shared.success.ability.getOne', {
        args: { entity: 'Currency' },
      }),
      statusCode: 200,
    };
  }

  @Put(':currencyId')
  @ApiOkResponse({
    description: 'update one Currency.',
    type: AppCurrencyResponse,
  })
  @UseGuards(new RoleGuard([Role.ADMIN]))
  async update(
    @Param('currencyId', ParseIntPipe) currencyId: number,
    @I18n() i18n: I18nContext<I18nTranslations>,

    @Body() updateCurrencyDto: UpdateCurrencyDto,
  ): Promise<ReturnedCurrencyResponse> {
    const currency = await this.currencyService.update(
      currencyId,
      updateCurrencyDto,
    );

    return {
      data: { currency },
      message: i18n.t('shared.success.ability.update', {
        args: { entity: 'Currency' },
      }),
      statusCode: 200,
    };
  }

  @Delete(':currencyId')
  @ApiOkResponse({
    description: 'delete one Currency.',
    type: AppResponse,
  })
  @UseGuards(new RoleGuard([Role.ADMIN]))
  async remove(
    @Param('currencyId') currencyId: number,
    @I18n() i18n: I18nContext<I18nTranslations>,
  ): Promise<ReturnedResponse> {
    await this.currencyService.remove(currencyId);

    return {
      message: i18n.t('shared.success.ability.delete', {
        args: { entity: 'Currency' },
      }),
      statusCode: 200,
    };
  }
}
