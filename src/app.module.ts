import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import {
  configOptions,
  filters,
  guards,
  i18nOptions,
  interceptors,
  jwtOptions,
  pipes,
} from './shared';
import { ModulesModule } from './modules/modules.module';
import { JwtModule } from '@nestjs/jwt';
import { CacheModule } from './core/libs/cache/cache.module';
import { I18nModule } from 'nestjs-i18n';
import { LoggerModule } from './core/libs/logger/logger.module';
import { ScheduleModule } from '@nestjs/schedule';
@Module({
  imports: [
    ConfigModule.forRoot(configOptions),
    I18nModule.forRoot(i18nOptions),
    JwtModule.registerAsync(jwtOptions),
    CacheModule.register(),
    ModulesModule,
    LoggerModule,
    ScheduleModule.forRoot(),
  ],
  providers: [...guards, ...filters, ...pipes, ...interceptors],
})
export class AppModule {}
