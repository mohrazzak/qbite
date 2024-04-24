import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { StoreService } from '../store.service';
import { I18nContext } from 'nestjs-i18n';
import { I18nTranslations } from 'src/generated';

@Injectable()
export class StoreOwnerGuard implements CanActivate {
  constructor(private readonly storeService: StoreService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const storeId = +request.params.storeId;
    const storeOwnerId = request.user.id;
    const isAuthorized = await this.checkOwnership(storeOwnerId, storeId);

    const i18n = I18nContext.current<I18nTranslations>(context)!;
    const errorMsg = i18n.t('auth.errors.unauthorized');

    if (!isAuthorized) throw new ForbiddenException(errorMsg);

    return true;
  }

  private async checkOwnership(
    storeOwnerId: number,
    storeId: number,
  ): Promise<boolean> {
    const realStoreOwner =
      await this.storeService.getStoreOwnerIdByStoreId(storeId);

    return realStoreOwner === storeOwnerId;
  }
}
