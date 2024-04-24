import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  Inject,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { appConfig } from '../configs';
import { CacheService } from '../libs/cache/cache.service';
import { IDecodedToken, IAuthRequest } from 'src/shared';
import { I18nContext } from 'nestjs-i18n';
import { I18nTranslations } from 'src/generated/i18n.generated';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    @Inject(appConfig.KEY)
    private readonly configService: ConfigType<typeof appConfig>,
    private readonly cacheService: CacheService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: IAuthRequest = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    const i18n = I18nContext.current<I18nTranslations>(context)!;
    if (!token) {
      throw new UnauthorizedException(i18n.translate('auth.errors.loginFirst'));
    }
    try {
      const decodedToken = await this.jwtService.verifyAsync<IDecodedToken>(
        token!,
        {
          secret: this.configService.jwt.login.secret,
        },
      );

      if (!decodedToken)
        throw new UnauthorizedException(
          i18n.translate('auth.errors.unauthorized'),
        );
      const userFromCache = await this.cacheService.getField(
        decodedToken.id.toString(),
        'token',
      );
      if (!!userFromCache) {
        request.user = decodedToken;
        return true;
      }
      throw new UnauthorizedException(
        i18n.translate('auth.errors.unauthorized'),
      );
    } catch (error: any) {
      throw new HttpException(
        error.message
          ? error.message
          : i18n.translate('auth.errors.unauthorized'),
        error.status ? error.status : HttpStatus.UNAUTHORIZED,
      );
    }
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
