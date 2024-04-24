import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCategoryDto } from './dto';
import { omitDtoSchema } from 'src/shared';
import { TranslateService } from '../translate/translate.service';
import { UpdateCategoryDto } from './dto/update.dto';

@Injectable()
export class CategoryService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly translateService: TranslateService,
  ) {}

  getAllByStoreId(storeId: number) {
    return this.prisma.category.findMany({
      where: { storeId },
      include: { name: { include: { translations: true } } },
    });
  }

  async getOne(categoryId: number) {
    return this.prisma.category.findUniqueOrThrow({
      where: { id: categoryId },
      include: { name: { include: { translations: true } } },
    });
  }

  async create(dto: CreateCategoryDto) {
    const { name, language, ...omittedDto } = omitDtoSchema(dto);

    const nameId = await this.translateService.createTranslation(
      name,
      language,
    );

    const createdCategory = await this.prisma.category.create({
      data: { ...omittedDto, nameId: nameId },
    });
    return this.getOne(createdCategory.id);
  }

  async update(categoryId: number, dto: UpdateCategoryDto) {
    const { name, ...omittedDto } = omitDtoSchema(dto);

    const updatedCategory = await this.prisma.category.update({
      where: { id: categoryId },
      data: {
        ...omittedDto,
        name: {
          update: {
            ...name,
            translations: {
              upsert: name.translations.map((t) => ({
                create: { ...t },
                update: { ...t },
                where: {
                  textContentId_languageId: {
                    languageId: t.languageId,
                    textContentId: name.id,
                  },
                  id: t.id,
                },
              })),
            },
          },
        },
      },
    });
    return this.getOne(updatedCategory.id);
  }

  async delete(categoryId: number) {
    return await this.prisma.category.delete({
      where: { id: categoryId },
      select: { id: true },
    });
  }
}
