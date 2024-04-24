import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { StoreOwnerEntity } from './entity';
import { StoreOwnerUpdateDto } from './dto';
import { StoreOwnerModel } from './models';
import { StoreOwnerEntityMapper } from './services/entity-mapper.service';
import { emailHtml } from './auth/mailer/enum';
import { getRandomNumber, omitDtoSchema } from 'src/shared';
import { MailerService } from './auth/mailer/mailer.service';
import { appConfig } from 'src/core';
import { ConfigType } from '@nestjs/config';

/**
 * Service for Store owner related business.
 */
@Injectable()
export class StoreOwnerService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly storeOwnerEntityMapper: StoreOwnerEntityMapper,
    private readonly mailerService: MailerService,
    @Inject(appConfig.KEY)
    private readonly configService: ConfigType<typeof appConfig>,
  ) {}

  /**
   * Finds a store owner entity by their email address.
   *
   * @param email - The email address of the store owner to search for.
   * @returns A Promise that resolves to the found store owner entity or null if not found.
   */
  async findByEmailOrThrow(email: string): Promise<StoreOwnerModel> {
    return await this.prismaService.storeOwner.findUniqueOrThrow({
      where: { email: email },
    });
  }

  async getOne(storeOwnerId: number): Promise<StoreOwnerEntity> {
    const foundStoreOwner =
      await this.prismaService.storeOwner.findUniqueOrThrow({
        where: { id: storeOwnerId },
      });
    return this.storeOwnerEntityMapper.modelToEntity(foundStoreOwner);
  }

  async changeEmail(storeOwnerId: number, newEmail: string) {
    const updatedStoreOwner = await this.prismaService.storeOwner.update({
      where: { id: storeOwnerId },
      data: { isActive: false, email: newEmail },
    });

    const code = getRandomNumber(4);

    await this.mailerService.sendMail({
      htmlContent: emailHtml.SIGNUP,
      receiverEmail: updatedStoreOwner.email,
      subject: 'Complete your signup',
      toBeReplacedTextArray: ['[PIN_CODE]', '[FRONTEND_SIGNUP]'],
      replacementTextArray: [code, this.configService.client.pages.signup],
    });

    return updatedStoreOwner;
  }

  /**
   * Update a store owner's information.
   *
   * @param {number} storeOwnerId - The ID of the store owner to update.
   * @param {StoreOwnerUpdateDto} dto - The DTO containing the updated store owner information.
   * @returns {Promise<StoreOwnerPublicEntity>} The updated public store owner entity.
   * @throws {BadRequestException} If the user doesn't exist or an error occurs during the update.
   */
  async update(
    storeOwnerId: number,
    dto: StoreOwnerUpdateDto,
  ): Promise<StoreOwnerEntity> {
    const { ...omittedDto } = omitDtoSchema(dto);
    const updatedStoreOwner = await this.prismaService.storeOwner.update({
      data: { ...omittedDto },
      where: { id: storeOwnerId },
    });

    return this.storeOwnerEntityMapper.modelToEntity(updatedStoreOwner);
  }

  /**
   * Soft Delete a store owner's account.
   *
   * @param {number} storeOwnerId - The ID of the store owner to delete.
   * @returns {Promise<void>} A promise resolves when the store owner account deleted.
   * @throws {BadRequestException} If the user doesn't exist or an error occurs during the delete.
   */
  async delete(storeOwnerId: number): Promise<void> {
    await this.prismaService.storeOwner.delete({
      where: { id: storeOwnerId },
    });
  }

  /**
   * Find a store owner by their ID.
   *
   * @param storeOwnerId - The ID of the store owner to find.
   * @returns A Promise that resolves to the found store owner, or null if not found.
   * @throws {Error} If an error occurs during the operation.
   */
  async findById(storeOwnerId: number): Promise<StoreOwnerModel> {
    return this.prismaService.storeOwner.findUniqueOrThrow({
      where: { id: storeOwnerId },
    });
  }
}
