import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { I18nHeader } from 'src/core/decorators/api';
import { AppStoreOwnerResponse, ReturnedStoreOwnerResponse } from '../dto';
import { I18n, I18nContext } from 'nestjs-i18n';
import { I18nTranslations } from 'src/generated';
import { Role } from 'src/generated/zod/enums';
import { AuthGuard, RoleGuard } from 'src/core';
import { IAuthRequest } from 'src/shared';
import { StoreOwnerAuthService } from './auth.service';
import {
  ConfirmSignupDto,
  SigninDto,
  SignupDto,
  AppStoreOwnerSigninResponse,
  ReturnedStoreOwnerSigninResponse,
  ConfirmResetStoreOwnerPasswordByPasswordDto,
  ResetPasswordByEmailDto,
  ResetStoreOwnerPasswordByPasswordDto,
} from './dto';
import {
  AppResponse,
  ReturnedResponse,
} from 'src/shared/interfaces/response.interface';

@Controller('auth')
@I18nHeader()
@ApiTags('auth')
export class StoreOwnerAuthController {
  constructor(private readonly authService: StoreOwnerAuthService) {}

  @Post('signup')
  @ApiCreatedResponse({
    description: 'Create a new store owner account.',
    type: AppStoreOwnerResponse,
  })
  async signup(
    @Body() dto: SignupDto,
    @I18n() i18n: I18nContext<I18nTranslations>,
  ): Promise<ReturnedStoreOwnerResponse | undefined> {
    const storeOwner = await this.authService.signup(dto);
    return {
      data: { storeOwner: storeOwner },
      message: i18n.t('auth.success.signup'),
      statusCode: HttpStatus.CREATED,
    };
  }

  @Patch('signup/confirm')
  @ApiOkResponse({
    description: 'Complete the signup process by confirming the email address.',
    type: AppStoreOwnerSigninResponse,
  })
  async confirmSignup(
    @Body() dto: ConfirmSignupDto,
    @I18n() i18n: I18nContext<I18nTranslations>,
  ): Promise<ReturnedStoreOwnerSigninResponse> {
    await this.authService.confirmSignup(dto);
    const { token, storeOwner } = await this.authService.signin({
      email: dto.email,
      password: dto.password,
    });
    return {
      data: {
        storeOwner,
        token,
      },
      message: i18n.t('auth.success.confirmSignup'),
      statusCode: HttpStatus.OK,
    };
  }

  @Post('signin')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'Authenticate and sign in as a store owner.',
    type: AppStoreOwnerSigninResponse,
  })
  async signin(
    @Body() dto: SigninDto,
    @I18n() i18n: I18nContext<I18nTranslations>,
  ): Promise<ReturnedStoreOwnerSigninResponse> {
    const { token, storeOwner } = await this.authService.signin(dto);
    return {
      data: {
        storeOwner,
        token,
      },
      message: i18n.t('auth.success.signin'),
      statusCode: HttpStatus.OK,
    };
  }

  @Patch('reset-password/by-password')
  @ApiOkResponse({
    description:
      'Change the password for a store owner who knows their current password.',
    type: ReturnedStoreOwnerResponse,
  })
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @UseGuards(new RoleGuard([Role.STORE_OWNER]))
  async resetPasswordByOldPassword(
    @Req() req: IAuthRequest,
    @Body() dto: ResetStoreOwnerPasswordByPasswordDto,
    @I18n() i18n: I18nContext<I18nTranslations>,
  ): Promise<ReturnedResponse> {
    await this.authService.resetPasswordByPassword(req.user.id, dto);
    return {
      message: i18n.t('auth.success.resetPassword'),
      statusCode: 201,
    };
  }

  @Patch('reset-password/by-email')
  @ApiOkResponse({
    description:
      "Send a password reset email to the store owner's registered email address",
    type: AppResponse,
  })
  async resetPasswordByEmail(
    @Body() dto: ResetPasswordByEmailDto,
    @I18n() i18n: I18nContext<I18nTranslations>,
  ): Promise<ReturnedResponse> {
    await this.authService.resetPasswordByEmail(dto.email);
    return {
      message: i18n.t('auth.success.resetPasswordMailSent'),
      statusCode: 201,
    };
  }

  @Patch('reset-password/by-email/confirm')
  @ApiOkResponse({
    description: 'Complete the password reset process by confirming the email',
    type: AppResponse,
  })
  async confirmResetPasswordByEmail(
    @Body() dto: ConfirmResetStoreOwnerPasswordByPasswordDto,
    @I18n() i18n: I18nContext<I18nTranslations>,
  ): Promise<ReturnedResponse> {
    await this.authService.confirmResetPasswordByEmail(
      dto.resetToken,
      dto.password,
    );
    return {
      message: i18n.t('auth.success.resetPassword'),
      statusCode: HttpStatus.OK,
    };
  }

  @ApiOkResponse({
    description: 'Successfully logged out the store owner.',
    type: AppResponse,
  })
  @Post('/logout')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @UseGuards(new RoleGuard([Role.STORE_OWNER]))
  async logout(
    @Req() req: IAuthRequest,
    @I18n() i18n: I18nContext<I18nTranslations>,
  ) {
    try {
      this.authService.logout(req.user.id);

      return {
        message: i18n.t('auth.success.logout'),
        statusCode: HttpStatus.OK,
      };
    } catch (error) {
      return { message: 'error happened' };
    }
  }
}
