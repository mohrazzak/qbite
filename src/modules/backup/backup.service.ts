import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { runBackup } from '@vorlefan/prisma-backup';
import { format } from 'date-fns';
import { Cron, CronExpression } from '@nestjs/schedule';
import { appConfig } from 'src/core';
import { ConfigType } from '@nestjs/config';

@Injectable()
export class BackupService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject(appConfig.KEY)
    private readonly configService: ConfigType<typeof appConfig>,
  ) {}
  async backupDatabase() {
    const backedUp = await this.prisma.$transaction([
      this.prisma.category.findMany(),
      this.prisma.currency.findMany(),
      this.prisma.detailsOnProduct.findMany(),
      this.prisma.font.findMany(),
      this.prisma.icon.findMany(),
      this.prisma.language.findMany(),
      this.prisma.plan.findMany(),
      this.prisma.planVersion.findMany(),
      this.prisma.product.findMany(),
      this.prisma.productDetails.findMany(),
      this.prisma.productImages.findMany(),
      this.prisma.productPrices.findMany(),
      this.prisma.qrCode.findMany(),
      this.prisma.recipe.findMany(),
      this.prisma.socialMediaPlatform.findMany(),
      this.prisma.socialMediaProfile.findMany(),
      this.prisma.store.findMany(),
      this.prisma.storeOwner.findMany(),
      this.prisma.subscription.findMany(),
      this.prisma.supportTicket.findMany(),
      this.prisma.supportTicketImages.findMany(),
      this.prisma.textContent.findMany(),
      this.prisma.translation.findMany(),
    ]);

    const models: Record<string, any> = {
      category: backedUp[0],
      currency: backedUp[1],
      detailsOnProduct: backedUp[2],
      font: backedUp[3],
      icon: backedUp[4],
      language: backedUp[5],
      plan: backedUp[6],
      planVersion: backedUp[7],
      product: backedUp[8],
      productDetails: backedUp[9],
      productImages: backedUp[10],
      productPrices: backedUp[11],
      qrCode: backedUp[12],
      recipe: backedUp[13],
      socialMediaPlatform: backedUp[14],
      socialMediaProfile: backedUp[15],
      store: backedUp[16],
      storeOwner: backedUp[17],
      subscription: backedUp[18],
      supportTicket: backedUp[19],
      supportTicketImages: backedUp[20],
      textContent: backedUp[21],
      translation: backedUp[22],
    };

    await runBackup({
      models,
      folder: 'backup',
      backupFolderName: format(new Date(), 'yyyy-MM-dd'),
      encrypt: true,
      password: process.env.BACKUP_PASSWORD,
    });
  }

  @Cron(CronExpression.EVERY_DAY_AT_6AM)
  async autoFullBackup() {
    await this.backupDatabase();
  }
}
