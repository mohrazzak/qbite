import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductDto } from './dto';
import { TranslateService } from '../translate/translate.service';
import { CreateProductFiles } from './types/create-product-files.type';
import { omitDtoSchema } from 'src/shared';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { ProductEntityMapper } from './services/entity-mapper.service';
import { ProductEntity } from './entity';
import { MultiLangFieldSelect } from '../translate/constants';
import { prismaExclude } from '../prisma/utils';
import { UpdateProductDto } from './dto/update.dto';
import { UpdateProductFiles } from './types';
import { Prisma } from '@prisma/client';
import { connectIdIfProvided } from 'src/shared/utils/connect-if-provided';
import { getMultiLangFieldCreateObject } from 'src/shared/utils/get-multi-lang-field-create-object.util';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class ProductService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly translateService: TranslateService,
    private readonly cloudinary: CloudinaryService,
    private readonly productEntityMapper: ProductEntityMapper,
  ) {}

  private readonly getOneSelect = {
    ...prismaExclude('Product', [
      'nameId',
      'descriptionId',
      'createdAt',
      'updatedAt',
      'deletedAt',
    ]),
    images: {
      select: {
        imageURL: true,
        id: true,
        isDefault: true,
        isVisible: true,
      },
    },
    prices: { select: { id: true, currencyId: true, price: true } },
    details: {
      select: {
        value: true,
        productDetails: {
          select: {
            icon: true,
            unit: MultiLangFieldSelect,
          },
        },
      },
    },
    description: MultiLangFieldSelect,
    name: MultiLangFieldSelect,
    category: {
      select: { id: true, icon: true, name: MultiLangFieldSelect },
    },
  };

  async getOne(productId: number) {
    return await this.prisma.product.findUniqueOrThrow({
      where: {
        id: productId,
      },
      select: this.getOneSelect,
    });
  }

  async getOneBySlug(productSlug: string, storeUsername: string) {
    const store = await this.prisma.store.findUniqueOrThrow({
      where: { username: storeUsername },
      select: { id: true },
    });

    return await this.prisma.product.findUniqueOrThrow({
      where: {
        slug_storeId: { slug: productSlug, storeId: store.id },
      },
      select: this.getOneSelect,
    });
  }

  async getStoreProductsById(storeId: number) {
    return this.prisma.product.findMany({
      where: { storeId },
      orderBy: { createdAt: 'desc' },
      select: this.getOneSelect,
    });
  }

  async create(
    dto: CreateProductDto,
    files: CreateProductFiles,
  ): Promise<ProductEntity> {
    const {
      name,
      description,
      language,
      defaultImgIndex,
      categoryId,
      storeId,
      ...omittedDto
    } = omitDtoSchema(dto);

    const uploadPromises = files.productImages.map(async (file, index) => {
      const isDefault = index === defaultImgIndex;
      const publicId = await this.cloudinary.uploadFile(file, 'products');
      return { index, publicId, isDefault };
    });

    const uploadedImages = await Promise.all(uploadPromises);

    uploadedImages.sort((a, b) => a.index - b.index);

    const createProductData: Prisma.ProductCreateInput = {
      ...omittedDto,
      store: { connect: { id: storeId } },
      category: connectIdIfProvided(categoryId),
      name: getMultiLangFieldCreateObject(name, language),
      description: getMultiLangFieldCreateObject(description, language),
      details: {
        create: omittedDto.details.map((detail) => ({
          productDetailsId: detail.productDetailsId,
          value: detail.value,
        })),
      },
      prices: { create: dto.prices },
      images: {
        create: uploadedImages.map((result) => ({
          imageURL: result.publicId,
          isDefault: result.isDefault,
        })),
      },
    };
    try {
      const createdProduct = await this.prisma.product.create({
        data: createProductData,
        include: {
          description: MultiLangFieldSelect,
          details: {
            select: {
              value: true,
              productDetails: {
                select: { icon: true, unit: MultiLangFieldSelect },
              },
            },
          },
          prices: { select: { price: true } },
        },
      });
      return this.getOne(createdProduct.id);
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        this.cloudinary.delayedMultipleDeletes(
          uploadedImages.map((img) => img.publicId),
        );
      }

      throw error;
    }
  }

  async update(id: number, dto: UpdateProductDto, files: UpdateProductFiles) {
    const { name, description, categoryId, defaultImgIndex, ...omittedDto } =
      omitDtoSchema(dto);

    const productImages = await this.prisma.productImages.findMany({
      where: { productId: id },
    });
    const deletedImageIds = productImages
      .filter(
        (image) =>
          !omittedDto.images?.some((dtoImage) => dtoImage.id === image.id),
      )
      .map((deletedImage) => deletedImage.id);

    const deletedImageUrls = productImages
      .filter((image) => deletedImageIds.includes(image.id))
      .map((deletedImage) => deletedImage.imageURL);

    const deletePromises = deletedImageUrls.map((imageUrl) =>
      this.cloudinary.delayedDelete(imageUrl),
    );

    await Promise.all(deletePromises);

    const uploadedImagesPromises =
      files && files.productImages
        ? files.productImages.map(async (productImage, i) => ({
            imageURL: await this.cloudinary.uploadFile(
              productImage,
              'products',
            ),
            isDefault:
              omittedDto.images && omittedDto.images.length
                ? omittedDto.images.length + defaultImgIndex === i
                : false,
          }))
        : [];

    const results = await Promise.all(uploadedImagesPromises);

    const defaultImgIsOldOne =
      omittedDto.images && omittedDto.images[defaultImgIndex];
    const updatedProduct = await this.prisma.product.update({
      where: { id },
      data: {
        ...omittedDto,
        category: categoryId
          ? { connect: { id: categoryId } }
          : { disconnect: true },
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
        description: {
          update: {
            ...description,
            translations: {
              upsert: description.translations.map((t) => ({
                create: { ...t },
                update: { ...t },
                where: {
                  textContentId_languageId: {
                    languageId: t.languageId,
                    textContentId: description.id,
                  },
                  id: t.id,
                },
              })),
            },
          },
        },

        details: {
          upsert: dto.details.map((detail) => ({
            create: { ...detail },
            update: { ...detail },
            where: {
              productId_productDetailsId: {
                productId: id,
                productDetailsId: detail.productDetailsId,
              },
            },
          })),
        },

        prices: {
          upsert: dto.prices.map((t) => ({
            create: { ...t },
            update: { ...t },
            where: {
              id: t.id ?? 0,
            },
          })),
        },
        images: {
          deleteMany: { id: { in: deletedImageIds } },
          updateMany: [
            { where: { isDefault: true }, data: { isDefault: false } },
            {
              where: { id: defaultImgIsOldOne?.id },
              data: { isDefault: true },
            },
          ],
          createMany: {
            data: results,
          },
        },
      },
      select: { id: true },
    });

    return this.getOne(updatedProduct.id);
  }

  async delete(storeId: number) {
    return await this.prisma.product.delete({
      where: { id: storeId },
      select: { id: true },
    });
  }

  async getAll(storeId: number) {
    return await this.prisma.product.findMany({
      where: { storeId },
      select: this.getOneSelect,
    });
  }
}
