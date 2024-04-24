import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { emailHtml } from 'src/modules/store-owner/auth/mailer/enum';
import { ITokenPayload, getRandomNumber, getRandomString } from 'src/shared';
import bcrypt from 'bcryptjs';
import { StoreOwnerEntity, StoreOwnerSignInEntity } from '../entity';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { CacheService } from 'src/core/libs/cache/cache.service';
import { MailerService } from 'src/modules/store-owner/auth/mailer/mailer.service';
import { StoreOwnerService } from '../store-owner.service';
import { I18nTranslations } from 'src/generated';
import { Role } from 'src/generated/zod/enums';
import { ConfigType } from '@nestjs/config';
import { appConfig } from 'src/core';
import { JwtService } from '@nestjs/jwt';
import {
  ConfirmSignupDto,
  ResetStoreOwnerPasswordByPasswordDto,
  SigninDto,
  SignupDto,
} from './dto';
import { I18nContext, I18nService } from 'nestjs-i18n';
import { addMonths } from 'date-fns';
import { StoreOwnerEntityMapper } from '../services/entity-mapper.service';
import { StoreOwnerModel } from '../models';

@Injectable()
export class StoreOwnerAuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly cacheService: CacheService,
    private readonly mailerService: MailerService,
    private readonly storeOwnerService: StoreOwnerService,
    @Inject(appConfig.KEY)
    private readonly configService: ConfigType<typeof appConfig>,
    private readonly jwtService: JwtService,
    private readonly i18n: I18nService<I18nTranslations>,
    private readonly storeOwnerEntityMapper: StoreOwnerEntityMapper,
  ) {}

  async signup(dto: SignupDto): Promise<StoreOwnerEntity> {
    const verificationCode = getRandomNumber(4);
    const password = dto.password || getRandomString(8);
    const hashedPassword = await bcrypt.hash(password, 10);

    const createdStoreOwner = await this.prismaService.storeOwner.create({
      data: {
        email: dto.email,
        signupCode: verificationCode,
        password: hashedPassword,
        subscriptions: {
          create: {
            planVersionId: dto.planVersionId,
            duration: 1,
            endDate: addMonths(new Date(), 1),
            price: 0,
            startDate: new Date(),
            status: 'active',
          },
        },
      },
    });

    await this.mailerService.sendMail({
      htmlContent: emailHtml.SIGNUP,
      receiverEmail: createdStoreOwner.email,
      subject: 'Complete your signup',
      toBeReplacedTextArray: [
        '[PIN_CODE]',
        '[FRONTEND_SIGNUP]',
        '[FRONTEND_HOME]',
      ],
      replacementTextArray: [
        verificationCode,
        this.configService.client.pages.signup,
        this.configService.client.pages.home,
      ],
    });

    return this.storeOwnerEntityMapper.modelToEntity(createdStoreOwner);
  }

  /**
   * Confirms the store owner signup.
   *
   * @param dto - The signup data transfer object containing email and other required information.
   * @returns A Promise that resolves to the created store owner entity.
   * @throws {BadRequestException} If the provided email already exists.
   * @throws {InternalServerErrorException} If there is an error during the signup process.
   */
  async confirmSignup(dto: ConfirmSignupDto) {
    const foundStoreOwner =
      await this.prismaService.storeOwner.findUniqueOrThrow({
        where: { email: dto.email },
      });

    if (foundStoreOwner.isActive)
      throw new BadRequestException(
        this.i18n.t('auth.errors.alreadyActive', {
          lang: I18nContext.current()!.lang,
        }),
      );

    if (dto.signupCode !== foundStoreOwner.signupCode)
      throw new BadRequestException(
        this.i18n.t('auth.errors.invalidSignupCode', {
          lang: I18nContext.current()!.lang,
        }),
      );
    if (
      dto.password &&
      !(await bcrypt.compare(dto.password, foundStoreOwner.password))
    )
      await this.changePassword(foundStoreOwner, dto.password);

    const updatedStoreOwner = await this.activate(foundStoreOwner.id);

    return this.storeOwnerEntityMapper.modelToEntity(updatedStoreOwner);
  }

  /**
   * Sign in a store owner.
   *
   * @param {SigninDto} dto - The data transfer object containing email and password for login.
   * @returns {Promise<{ token: string, storeOwner: StoreOwnerEntity }>} A Promise that resolves with the token and store owner entity upon successful login.
   * @throws {BadRequestException} If the provided email doesn't exist or password is incorrect.
   * @throws {InternalServerErrorException} If there is an error during the login process.
   */
  async signin(
    dto: SigninDto,
  ): Promise<{ token: string; storeOwner: StoreOwnerSignInEntity }> {
    const storeOwner = await this.prismaService.storeOwner.findUnique({
      where: {
        email: dto.email,
      },
      include: { stores: { select: { id: true } } },
    });

    if (!storeOwner) {
      throw new BadRequestException(
        this.i18n.t('auth.errors.wrongCredentials', {
          lang: I18nContext.current()!.lang,
        }),
      );
    }
    const passwordsMatch = await this.comparePasswords(
      dto.password,
      storeOwner.password,
    );

    if (!passwordsMatch) {
      throw new BadRequestException(
        this.i18n.t('auth.errors.wrongCredentials', {
          lang: I18nContext.current()!.lang,
        }),
      );
    }

    const storeOwnerEntity =
      this.storeOwnerEntityMapper.modelToSignInEntity(storeOwner);

    const cachedToken = await this.cacheService.getField(
      storeOwnerEntity.id.toString(),
      'token',
    );

    if (cachedToken) {
      return { token: cachedToken, storeOwner: storeOwnerEntity };
    }

    const tokenPayload: ITokenPayload = {
      role: Role.STORE_OWNER,
      id: storeOwnerEntity.id,
    };

    const token = await this.generateToken(
      tokenPayload,
      this.configService.jwt.login.duration,
    );

    await this.cacheService.setObject(storeOwnerEntity.id.toString(), {
      token,
    });

    await this.updateLastLoginTime(storeOwner.id);

    return { storeOwner: storeOwnerEntity, token };
  }

  private async updateLastLoginTime(storeOwnerId: number) {
    setImmediate(async () => {
      await this.prismaService.storeOwner.update({
        where: { id: storeOwnerId },
        data: { lastLogin: new Date() },
      });
    });
  }

  /**
   * Compares a plain text password with a hashed password to check for a match.
   *
   * @param {string} plainPassword - The plain text password to compare.
   * @param {string} hashedPassword - The hashed password to compare against.
   * @returns {Promise<boolean>} - A promise that resolves to `true` if the passwords match, `false` otherwise.
   * @throws {Error} If an error occurs during the password comparison.
   */
  async comparePasswords(
    plainPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(plainPassword, hashedPassword);
  }

  /**
   * Activates a store owner's account.
   *
   * @param {number} storeOwnerId - The ID of the store owner to activate.
   * @returns {Promise<StoreOwnerPublicEntity>} A Promise that resolves to the updated store owner entity.
   * @throws {BadRequestException} If the provided store owner ID is invalid or other validation fails.
   * @throws {InternalServerErrorException} If there is an error during the activation process.
   */
  async activate(storeOwnerId: number): Promise<StoreOwnerModel> {
    const updatedStoreOwner = await this.prismaService.storeOwner.update({
      where: { id: storeOwnerId, isActive: false },
      data: { isActive: true },
    });

    return updatedStoreOwner;
  }

  /**
   * Change the password to a store owner's account.
   *
   * @param {number} storeOwnerId - The ID of the store owner to add the password to.
   * @param {string} password - The password to add.
   * @param {boolean} isResetByEmail - Is the reset related to reset by email.
   * @returns {Promise<StoreOwnerPublicEntity>} A Promise that resolves to the updated store owner entity.
   * @throws {BadRequestException} If the provided store owner ID is invalid or other validation fails.
   * @throws {InternalServerErrorException} If there is an error during the password addition process.
   */
  async changePassword(
    storeOwner: StoreOwnerModel,
    password: string,
    isResetByEmail?: boolean,
  ): Promise<StoreOwnerEntity> {
    const passwordSame = await this.comparePasswords(
      password,
      storeOwner.password,
    );

    if (passwordSame)
      throw new BadRequestException(
        this.i18n.t('auth.errors.changePasswordToNew', {
          lang: I18nContext.current()!.lang,
        }),
      );

    const hashedPassword = await bcrypt.hash(password, 10);

    const updatedStoreOwner = await this.prismaService.storeOwner.update({
      where: { id: storeOwner.id },
      data: {
        password: hashedPassword,
        resetPasswordToken: isResetByEmail
          ? null
          : storeOwner.resetPasswordToken,
      },
    });

    return this.storeOwnerEntityMapper.modelToEntity(updatedStoreOwner);
  }

  /**
   * Resets a store owner's password by verifying their old password.
   *
   * @param {number} storeOwnerId - The ID of the store owner.
   * @param {ResetStoreOwnerPasswordByPasswordDto} dto - The DTO containing the new password.
   * @returns {Promise<StoreOwnerPublicEntity>} - The updated store owner entity with sensitive information omitted.
   * @throws {BadRequestException} If an error occurs during the password reset process.
   */
  async resetPasswordByPassword(
    storeOwnerId: number,
    dto: ResetStoreOwnerPasswordByPasswordDto,
  ): Promise<StoreOwnerEntity> {
    const foundStoreOwner =
      await this.prismaService.storeOwner.findUniqueOrThrow({
        where: { id: storeOwnerId },
      });

    const passwordsMatch = await this.comparePasswords(
      dto.password,
      foundStoreOwner.password,
    );

    if (!passwordsMatch)
      throw new BadRequestException(
        this.i18n.t('auth.errors.wrongCredentials', {
          lang: I18nContext.current()!.lang,
        }),
      );

    await this.changePassword(foundStoreOwner, dto.newPassword);

    return this.storeOwnerEntityMapper.modelToEntity(foundStoreOwner);
  }

  /**
   * Sends a password reset email to a store owner based on their email address.
   * This email contains a token for password reset.
   *
   * @param {string} email - The email address of the store owner.
   * @returns {Promise<void>} - A promise that resolves when the email is sent successfully.
   * @throws {BadRequestException} If the store owner with the given email doesn't exist.
   */
  async resetPasswordByEmail(email: string): Promise<void> {
    const foundStoreOwner =
      await this.prismaService.storeOwner.findUniqueOrThrow({
        where: { email },
      });

    const token = await this.generateToken(
      {
        id: foundStoreOwner.id,
        role: Role.STORE_OWNER,
      },
      this.configService.jwt.resetPassword.duration,
    );

    await this.mailerService.sendMail({
      htmlContent: emailHtml.RESET_PASSWORD,
      receiverEmail: email,
      subject: 'Reset your password',
      toBeReplacedTextArray: ['[FRONTEND_RESET_PASSWORD]', '[FRONTEND_HOME]'],
      replacementTextArray: [
        `${this.configService.client.pages.resetPassword}/${token}`,
        this.configService.client.pages.home,
      ],
    });

    await this.prismaService.storeOwner.update({
      data: { resetPasswordToken: token },
      where: { id: foundStoreOwner.id },
    });
  }

  /**
   * Confirms the password reset for a store owner using a reset token and sets a new password.
   *
   * @param {string} resetToken - The reset token received by the store owner.
   * @param {string} newPassword - The new password to set for the store owner.
   * @returns {Promise<void>} - A promise that resolves when the password is successfully reset.
   * @throws {BadRequestException} If the store owner with the associated reset token doesn't exist.
   * @throws {Error} If there's an issue changing the password.
   */
  async confirmResetPasswordByEmail(
    resetToken: string,
    newPassword: string,
  ): Promise<void> {
    const { id } = await this.jwtService.verifyAsync(resetToken);

    const foundStoreOwner =
      await this.prismaService.storeOwner.findUniqueOrThrow({
        where: { id },
      });

    if (foundStoreOwner.resetPasswordToken !== resetToken)
      throw new BadRequestException(
        this.i18n.t('auth.errors.unauthorized', {
          lang: I18nContext.current()!.lang,
        }),
      );

    await this.changePassword(foundStoreOwner, newPassword, true);
  }
  async generateToken(tokenPayload: ITokenPayload, duration: string) {
    const generatedToken = await this.jwtService.signAsync(tokenPayload, {
      expiresIn: duration,
    });

    return generatedToken;
  }
  async logout(storeOwnerId: number) {
    await this.cacheService.deleteKey(storeOwnerId.toString());
  }
}
