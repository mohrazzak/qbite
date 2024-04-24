import multer = require('multer');
import { extname } from 'path';
import { Request } from 'express';
import { format } from 'date-fns';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { BadRequestException } from '@nestjs/common';
import { I18nContext } from 'nestjs-i18n';
import { I18nTranslations } from 'src/generated';

const localFileStorageOptions: multer.DiskStorageOptions = {
  filename: (req, file, callback) => {
    const originalName = file.originalname;
    const fileExtension = extname(originalName);
    const now = new Date();
    const timestamp = format(now, '[yyyy-MM-dd-HH-mm-ss]');
    const randomString = [...Array(4)]
      .map(() => Math.floor(Math.random() * 16).toString(16))
      .join('');

    const newFilename = `${timestamp}-${randomString}${fileExtension}`;

    callback(null, newFilename);
  },
};

export const localFileStorage = multer.diskStorage(localFileStorageOptions);

export const multerLimits: MulterOptions = {
  limits: { fileSize: 1000_000 * 10 },
  fileFilter,
  // storage: localFileStorage,
};

const allowedExtensions = ['.png', '.jpeg', '.jpg', '.webp'];

export function fileFilter(
  req: Request,
  file: Express.Multer.File,
  callback: FileFilterCallback,
) {
  const ext = extname(file.originalname);
  const i18n = I18nContext.current<I18nTranslations>()!;

  if (!allowedExtensions.includes(ext)) {
    return callback(
      new BadRequestException(i18n.t('validation.errors.invalidFileType')),
      false,
    );
  }

  callback(null, true);
}

interface FileFilterCallback {
  (error: Error | null, isFileAccepted: boolean): void;
}
