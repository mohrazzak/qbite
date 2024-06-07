import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule } from '@nestjs/swagger';
import { swaggerOptions } from 'src/shared';
import compression = require('compression');
import helmet from 'helmet';
import { TimeoutInterceptor } from './core';
import { patchNestjsSwagger } from '@anatine/zod-nestjs';
import { zodI18n } from './core';
import i18next from 'i18next';
import { NestExpressApplication } from '@nestjs/platform-express';
import {
  I18nMiddleware,
  I18nValidationExceptionFilter,
  I18nValidationPipe,
} from 'nestjs-i18n';
import { HttpStatus } from '@nestjs/common';
import { LoggerService } from './core/libs/logger/logger.service';
import expressBasicAuth = require('express-basic-auth');

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bufferLogs: true,
  });

  app.useLogger(app.get(LoggerService));

  app.use(
    '/docs*',
    expressBasicAuth({
      challenge: true,
      users: {
        QBite: 'is the best',
      },
      unauthorizedResponse: {
        message: 'unauthorized',
      },
    }),
  );

  patchNestjsSwagger();
  const swaggerDocument = SwaggerModule.createDocument(app, swaggerOptions);
  SwaggerModule.setup('docs', app, swaggerDocument);
  app.enableCors();

  await zodI18n(i18next, app);

  app.use(compression());
  app.use(helmet());
  app.use(I18nMiddleware);

  // Global Interceptors
  app.useGlobalInterceptors(new TimeoutInterceptor());
  app.useGlobalPipes(new I18nValidationPipe());
  app.useGlobalFilters(
    new I18nValidationExceptionFilter({
      detailedErrors: true,
      errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
    }),
  );

  await app.listen(process.env.PORT || 4000);
}
bootstrap();
