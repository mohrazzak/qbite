// cloudinary.service.ts

import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
import { I18nContext } from 'nestjs-i18n';
import { appConfig } from 'src/core';
import { I18nTranslations } from 'src/generated';
import * as streamifier from 'streamifier';

type AllowedFolders = 'stores' | 'products' | 'support-tickets';

@Injectable()
export class CloudinaryService {
  constructor(
    @Inject(appConfig.KEY)
    private readonly configService: ConfigType<typeof appConfig>,
  ) {}
  uploadFile(
    file: Express.Multer.File,
    folder: AllowedFolders,
  ): Promise<string> {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          allowed_formats: ['png', 'jpg'],
          backup: true,
          folder: `${this.configService.environment}/${folder}`,
          transformation: {
            quality: 'auto:good',
            fetch_format: 'auto',
            format: 'auto',
          },
        },
        (error: any, result?: UploadApiResponse) => {
          if (error) return reject(error);

          if (result) {
            resolve(result.public_id);
          } else {
            const i18n = I18nContext.current<I18nTranslations>()!;
            const errorMessage = i18n.t('validation.errors.failedToUpload', {
              args: { entity: 'Store' },
            });

            reject(new BadRequestException(errorMessage));
          }
        },
      );
      streamifier.createReadStream(file.buffer).pipe(uploadStream);
    });
  }

  async deleteFile(publicId: string) {
    await cloudinary.uploader.destroy(publicId);
  }
  async delayedDelete(publicId: string) {
    setImmediate(async () => {
      await this.deleteFile(publicId);
    });
  }

  delayedMultipleDeletes(publicIds: string[]) {
    setImmediate(async () => {
      await cloudinary.api.delete_resources(publicIds);
    });
  }

  async downloadAll() {
    const stores = await cloudinary.api.resources_by_asset_folder(
      `${this.configService.environment}/stores`,
    );
    const products = await cloudinary.api.resources_by_asset_folder(
      `${this.configService.environment}/products`,
    );
    const supportTickets = await cloudinary.api.resources_by_asset_folder(
      `${this.configService.environment}/support-tickets`,
    );
    return { stores, products, supportTickets };
  }
}
