import {
  Controller,
  Delete,
  HttpStatus,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { I18n, I18nContext } from 'nestjs-i18n';
import { I18nTranslations } from 'src/generated';
import {
  AppResponse,
  ReturnedResponse,
} from 'src/shared/interfaces/response.interface';
import { TranslateService } from './translate.service';
import { AuthGuard } from 'src/core';

@UseGuards(AuthGuard)
@ApiBearerAuth()
@ApiTags('Translation')
@Controller('translate')
export class TranslateController {
  constructor(private readonly translateService: TranslateService) {}

  @Delete(':translationId')
  @ApiParam({ name: 'translationId' })
  @ApiOkResponse({
    description: 'Store translation deleted successfully.',
    type: AppResponse,
  })
  async deleteTranslation(
    @Param('translationId', ParseIntPipe) translationId: number,
    @I18n() i18n: I18nContext<I18nTranslations>,
  ): Promise<ReturnedResponse> {
    await this.translateService.deleteTranslation(translationId);
    return {
      message: i18n.t('shared.success.ability.delete', {
        args: { entity: 'Translation' },
      }),
      statusCode: HttpStatus.OK,
    };
  }
}
