import { CacheModuleAsyncOptions } from '@nestjs/cache-manager';
import {
  ConfigModule,
  ConfigModuleOptions,
  ConfigService,
} from '@nestjs/config';
import { JwtModuleAsyncOptions } from '@nestjs/jwt';
import { DocumentBuilder } from '@nestjs/swagger';
import { redisStore } from 'cache-manager-redis-yet';
import {
  AcceptLanguageResolver,
  CookieResolver,
  HeaderResolver,
  I18nOptions,
  QueryResolver,
} from 'nestjs-i18n';
import { join } from 'path';
// import { RedisClientOptions } from 'redis'; // TODO ADD IT TO BELOW REDIS OPTIONS
import { appConfig } from 'src/core/configs';
import { configValidation } from 'src/shared/validations';

export const configOptions: ConfigModuleOptions = {
  isGlobal: true,
  validationSchema: configValidation,
  load: [appConfig],
  cache: true,
  validationOptions: { abortEarly: true },
  envFilePath: `${process.cwd()}/src/core/configs/env/.env.${
    process.env.NODE_ENV
  }`,
  expandVariables: true,
};

export const jwtOptions: JwtModuleAsyncOptions = {
  useFactory: async (configService: ConfigService) => ({
    secret: configService.get<string>('JWT_LOGIN_SECRET')!,
    signOptions: {
      expiresIn: configService.get<string>('JWT_LOGIN_DURATION')!,
    },
  }),
  inject: [ConfigService],
  global: true,
};

export const swaggerOptions = new DocumentBuilder()
  .setTitle('َQBite')
  .setDescription('The best docs exists on earth 😁')
  .setVersion('0.1')
  .addBearerAuth()
  .build();

export const redisOptions: CacheModuleAsyncOptions = {
  isGlobal: true,
  imports: [ConfigModule],
  useFactory: async (configService: ConfigService) => {
    const store = await redisStore({
      socket: {
        host: configService.getOrThrow('REDIS_HOST'),
        port: +configService.getOrThrow('REDIS_PORT'),
      },
      password: configService.getOrThrow('REDIS_PASSWORD'),
    });

    return {
      store: () => store,
    };
  },
  inject: [ConfigService],
};

export const i18nOptions: I18nOptions = {
  fallbackLanguage: 'en',
  loaderOptions: {
    path: join(process.cwd(), 'src', 'resources', 'i18n'),
    watch: true,
  },
  typesOutputPath: join(
    `${process.cwd()}`,
    'src',
    'generated',
    'i18n.generated.ts',
  ),
  resolvers: [
    { use: QueryResolver, options: ['lang', 'locale', '1'] },
    new HeaderResolver(['x-custom-lang']),
    AcceptLanguageResolver,
    new CookieResolver(['lang', 'locale', '1']),
  ],
};
