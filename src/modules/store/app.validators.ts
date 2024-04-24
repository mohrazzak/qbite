import { FileValidator } from '@nestjs/common';

export interface CustomUploadTypeValidatorOptions {
  fileType: string[];
}

export class CustomUploadFileTypeValidator extends FileValidator {
  private _allowedMimeTypes: string[];

  constructor(
    protected readonly validationOptions: CustomUploadTypeValidatorOptions,
  ) {
    super(validationOptions);
    this._allowedMimeTypes = this.validationOptions.fileType;
  }

  public isValid(files?: Record<string, Express.Multer.File[]>): boolean {
    if (!files) {
      return true; // No files provided, consider it valid
    }

    for (const key in files) {
      const fileArray = files[key];

      if (Array.isArray(fileArray)) {
        for (const file of fileArray) {
          if (!this._isFileValid(file)) {
            return false;
          }
        }
      } else {
        return false; // Invalid structure, not an array
      }
    }

    return true;
  }

  public buildErrorMessage(): string {
    return `Upload not allowed. Upload only files of type: ${this._allowedMimeTypes.join(
      ', ',
    )}`;
  }

  private _isFileValid(file?: Express.Multer.File): boolean {
    return this._allowedMimeTypes.includes(file?.mimetype || '');
  }
}
