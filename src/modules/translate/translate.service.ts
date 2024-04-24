/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { I18nService } from 'nestjs-i18n';
import { I18nTranslations } from 'src/generated';
import { SupportedLanguages } from 'src/shared';
import { Language } from '@prisma/client';

@Injectable()
export class TranslateService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly i18n: I18nService<I18nTranslations>,
  ) {}

  async createTranslation(translation: string, language: SupportedLanguages) {
    return (
      await this.prismaService.textContent.create({
        data: {
          fallback: translation,
          language: { connect: { shortcut: language } },
        },
      })
    ).id;
  }

  async updateOrCreateTranslation(
    textContentId: number,
    languageId: number,
    translation: string,
  ) {
    return await this.prismaService.textContent.upsert({
      where: { id: textContentId },
      create: {
        fallback: translation,
        languageId,
      },
      update: {
        fallback: translation,
        translations: {
          update: {
            where: {
              textContentId: 1,
              textContentId_languageId: { languageId, textContentId },
            },
            data: { text: translation },
          },
        },
      },
    });
  }

  async deleteTranslation(translationId: number) {
    await this.prismaService.$transaction(async (prisma) => {
      // Delete the translation
      const deletedTranslation = await prisma.translation.delete({
        where: { id: translationId },
      });

      // Find the latest translation
      const latestTranslation = await prisma.translation.findFirst({
        where: { textContentId: deletedTranslation.textContentId },
        orderBy: { id: 'asc' },
      });

      if (!latestTranslation) {
        // If no translation left, delete the TextContent
        await prisma.textContent.delete({
          where: { id: deletedTranslation.textContentId },
        });
      } else {
        // If there is a translation, update the TextContent with the latest translation
        await prisma.textContent.update({
          where: { id: deletedTranslation.textContentId },
          data: {
            fallback: latestTranslation.text,
            languageId: latestTranslation.languageId,
          },
        });
      }
    });
  }

  async deleteManyTextContent(ids: number[]) {
    return await this.prismaService.textContent.deleteMany({
      where: { id: { in: ids } },
    });
  }

  async getLanguageByShortcut(language: SupportedLanguages): Promise<Language> {
    const languageData = await this.prismaService.language.findUniqueOrThrow({
      where: { shortcut: language },
    });

    return languageData;
  }
}
