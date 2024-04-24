import {
  Catch,
  ExceptionFilter,
  ArgumentsHost,
  InternalServerErrorException,
  HttpException, // Import HttpException for Error handling
} from '@nestjs/common';
import { I18nContext } from 'nestjs-i18n';
import { I18nTranslations } from 'src/generated';

@Catch(InternalServerErrorException, Error)
export class InternalExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const i18n = I18nContext.current<I18nTranslations>(host)!;

    const statusCode = 500;
    const message =
      (exception instanceof InternalServerErrorException &&
        exception.message) ||
      i18n.t('app.errors.internalServerError');

    console.log(exception);

    response.status(statusCode).json({
      status: false,
      statusCode,
      message,
      path: request.path,
      time: new Date().toISOString(),
      data: null,
    });
  }
}
