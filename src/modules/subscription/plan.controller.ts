import { Controller, Get } from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import {
  AppGetAllPlansResponse,
  ReturnedGetAllPlansResponse,
} from './responses';
import { I18n, I18nContext } from 'nestjs-i18n';
import { I18nTranslations } from 'src/generated';
import { PlanService } from './plan.service';
import { I18nHeader } from 'src/core/decorators';

@Controller('plan')
@ApiTags('Plans')
@I18nHeader()
export class PlanController {
  constructor(private readonly planService: PlanService) {}

  @Get()
  @ApiCreatedResponse({
    description: 'Get all plans.',
    type: AppGetAllPlansResponse,
  })
  async getAll(
    @I18n()
    i18n: I18nContext<I18nTranslations>,
  ): Promise<ReturnedGetAllPlansResponse> {
    const plans = await this.planService.getLatestSubscriptionsVersion();

    return {
      data: { plans },
      message: i18n.t('shared.success.getAll', {
        args: { entity: 'PlanVersion' },
      }),
      statusCode: 200,
    };
  }
}
