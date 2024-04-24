import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { I18nHeader } from 'src/core/decorators';
import { AuthGuard, FilesValidation, RoleGuard } from 'src/core';
import { Role } from '@prisma/client';
import {
  AppSupportTicketResponse,
  ReturnedSupportTicketResponse,
} from './responses/get-one.response';
import {
  AppGetAllSupportTicketsResponse,
  ReturnedGetAllSupportTicketsResponse,
} from './responses/get-all.response';
import {
  AppResponse,
  ReturnedResponse,
} from 'src/shared/interfaces/response.interface';
import { SupportTicketService } from './support-ticket.service';
import { CreateSupportTicketDto } from './dto/create-support-ticket.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { multerLimits } from '../cloudinary/local-file.storage';
import { CreateSupportTicketFiles } from './types/create-support-ticket.type';
import { I18nTranslations } from 'src/generated';
import { I18n, I18nContext } from 'nestjs-i18n';

@Controller('support-ticket')
@ApiTags('Support Ticket')
@I18nHeader()
@UseGuards(AuthGuard)
@ApiBearerAuth()
export class SupportTicketController {
  constructor(private readonly supportTicketService: SupportTicketService) {}

  @Post()
  @ApiOkResponse({
    description: 'Create a Currency.',
    type: AppSupportTicketResponse,
  })
  @UseInterceptors(FileFieldsInterceptor([{ name: 'images' }], multerLimits))
  @ApiConsumes('multipart/form-data')
  async create(
    @Body() createCurrencyDto: CreateSupportTicketDto,
    @UploadedFiles(new FilesValidation([{ name: 'images', required: false }]))
    files: CreateSupportTicketFiles,
    @I18n() i18n: I18nContext<I18nTranslations>,
  ): Promise<ReturnedSupportTicketResponse> {
    const supportTicket = await this.supportTicketService.create(
      createCurrencyDto,
      files.images,
    );

    return {
      data: { supportTicket },
      message: i18n.t('shared.success.ability.create', {
        args: { entity: 'SupportTicket' },
      }),
      statusCode: 200,
    };
  }

  @Get()
  @ApiOkResponse({
    description: 'get all tickets.',
    type: AppGetAllSupportTicketsResponse,
  })
  @UseGuards(new RoleGuard([Role.ADMIN]))
  async findAll(
    @I18n() i18n: I18nContext<I18nTranslations>,
  ): Promise<ReturnedGetAllSupportTicketsResponse> {
    const supportTickets = await this.supportTicketService.findAll();

    return {
      data: { supportTickets },
      message: i18n.t('shared.success.ability.getAll', {
        args: { entity: 'SupportTicket' },
      }),
      statusCode: 200,
    };
  }

  @Get(':supportTicketId')
  @ApiOkResponse({
    description: 'get one support ticket by id.',
    type: AppSupportTicketResponse,
  })
  @UseGuards(new RoleGuard([Role.ADMIN]))
  async findOne(
    @Param('supportTicketId', ParseIntPipe) supportTicketId: number,
    @I18n() i18n: I18nContext<I18nTranslations>,
  ): Promise<ReturnedSupportTicketResponse> {
    const supportTicket =
      await this.supportTicketService.findOne(supportTicketId);

    return {
      data: { supportTicket },
      message: i18n.t('shared.success.ability.getOne', {
        args: { entity: 'SupportTicket' },
      }),
      statusCode: 200,
    };
  }

  @Get('store/:storeId')
  @ApiOkResponse({
    description: 'get all store tickets.',
    type: AppGetAllSupportTicketsResponse,
  })
  async findMyTickets(
    @Param('storeId', ParseIntPipe) storeId: number,
    @I18n() i18n: I18nContext<I18nTranslations>,
  ): Promise<ReturnedGetAllSupportTicketsResponse> {
    const supportTickets =
      await this.supportTicketService.findAllStoreTickets(storeId);

    return {
      data: { supportTickets },
      message: i18n.t('shared.success.ability.getAll', {
        args: { entity: 'SupportTicket' },
      }),
      statusCode: 200,
    };
  }

  @Delete(':supportTicketId')
  @ApiOkResponse({
    description: 'delete one supportTicket .',
    type: AppResponse,
  })
  @UseGuards(new RoleGuard([Role.ADMIN]))
  async remove(
    @Param('supportTicketId') supportTicketId: number,
    @I18n() i18n: I18nContext<I18nTranslations>,
  ): Promise<ReturnedResponse> {
    await this.supportTicketService.remove(supportTicketId);

    return {
      message: i18n.t('shared.success.ability.delete', {
        args: { entity: 'SupportTicket' },
      }),
      statusCode: 200,
    };
  }
}
