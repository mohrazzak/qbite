import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { CreateProductDetailDto } from './dto';
import { TranslateService } from 'src/modules/translate/translate.service';
import { UpdateProductDetailDto } from './dto/update.dto';
import { omitDtoSchema } from 'src/shared';

@Injectable()
export class ProductDetailService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly translateService: TranslateService,
  ) {}

  async getGlobalAndStoreRelated(storeId: number) {
    return await this.prisma.productDetails.findMany({
      where: {
        OR: [{ storeId: null }, { storeId }],
      },
      include: { unit: { include: { translations: true } } },
    });
  }

  async getStoreRelated(storeId: number) {
    return await this.prisma.productDetails.findMany({
      where: {
        storeId,
      },
    });
  }

  async createStoreRelated(dto: CreateProductDetailDto) {
    const unitTextContent = await this.translateService.createTranslation(
      dto.detail,
      dto.language,
    );
    const createdProductDetail = await this.prisma.productDetails.create({
      data: {
        storeId: dto.storeId,
        icon: dto.icon,
        unitId: unitTextContent,
      },
    });

    return this.getOne(createdProductDetail.id);
  }

  async getOne(detailId: number) {
    return await this.prisma.productDetails.findUniqueOrThrow({
      where: { id: detailId },
      include: { unit: { include: { translations: true } } },
    });
  }

  async updateStoreRelated(detailId: number, dto: UpdateProductDetailDto) {
    const { unit, ...omittedDto } = omitDtoSchema(dto);
    const updatedProductDetail = await this.prisma.productDetails.update({
      data: {
        ...omittedDto,
        unit: {
          update: {
            ...unit,
            translations: {
              set: unit.translations.map((t) => ({
                ...t,
                textContentId_languageId: {
                  languageId: t.languageId,
                  textContentId: unit.id,
                },
              })),
            },
          },
        },
      },
      where: { id: detailId },
    });

    return this.getOne(updatedProductDetail.id);
  }

  async delete(detailId: number) {
    await this.prisma.productDetails.delete({
      where: { id: detailId },
    });
  }
}
