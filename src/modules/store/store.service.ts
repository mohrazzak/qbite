import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateStoreDto, UpdateStoreDto } from './dto';
import { CreateStoreFiles, UpdateStoreFiles } from './interfaces';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { omitDtoSchema } from 'src/shared';
import { TranslateService } from '../translate/translate.service';
import { StoreEntityMapper } from './services/entity-mapper.service';
import { MultiLangFieldSelect } from '../translate/constants';
import { ProductService } from '../product/product.service';
import { Prisma } from '@prisma/client';
import { getMultiLangFieldUpdateObject } from 'src/shared/utils/get-multi-lang-field-update-object..util';
import {
  getMultiLangFieldCreateObject,
  getMultiLangFieldCreateOptionalObject,
} from 'src/shared/utils/get-multi-lang-field-create-object.util';
@Injectable()
export class StoreService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly cloudinaryService: CloudinaryService,
    private readonly translateService: TranslateService,
    private readonly storeEntityMapper: StoreEntityMapper,
    private readonly productService: ProductService,
  ) {}

  // async getAll(
  //   storeOwnerId: number,
  //   lng: SupportedLanguages,
  // ): Promise<StoreEntity[]> {
  //   const createdStores = await this.prisma.store.findMany({
  //     where: { visible: true, storeOwnerId },
  //   });

  //   const storesIds = createdStores.map((s) => s.id);

  //   const translatedFields = await this.translateService.getAll(
  //     'store',
  //     ['name', 'slogan', 'description'],
  //     storesIds,
  //     lng,
  //   );

  //   return await this.translateService.combineTranslationsAndData<
  //     StoreEntityWithoutMultiLanguageFields,
  //     StoreEntity
  //   >(translatedFields, createdStores);
  // }

  async getOne(storeId: number) {
    const store = await this.prisma.store.findUniqueOrThrow({
      where: { id: storeId },
      include: {
        name: MultiLangFieldSelect,
        description: MultiLangFieldSelect,
        slogan: MultiLangFieldSelect,
      },
    });
    return this.storeEntityMapper.modelToEntity(store);
  }

  async getOneByUsername(username: string) {
    const store = await this.prisma.store.findUniqueOrThrow({
      where: { username, visible: true },
      include: {
        name: MultiLangFieldSelect,
        description: MultiLangFieldSelect,
        slogan: MultiLangFieldSelect,
      },
    });

    const products = await this.productService.getStoreProductsById(store.id);

    return { store: this.storeEntityMapper.modelToEntity(store), products };
  }

  async create(
    storeOwnerId: number,
    dto: CreateStoreDto,
    files: CreateStoreFiles,
  ) {
    let logoURL: string | null = null;
    let backgroundURL: string | undefined = undefined;

    try {
      logoURL = await this.uploadImage(files.logoFile?.[0]);
      if (files.backgroundFile && files.backgroundFile[0]) {
        backgroundURL = await this.uploadImage(files.backgroundFile[0]);
      }

      const { name, description, slogan, language, ...omittedDto } =
        omitDtoSchema(dto);

      const storeCreateData: Prisma.StoreCreateInput = {
        ...omittedDto,
        storeOwner: { connect: { id: storeOwnerId } },
        logoURL,
        backgroundURL,
        name: getMultiLangFieldCreateObject(name, language),
        description: getMultiLangFieldCreateObject(description, language),
        slogan: getMultiLangFieldCreateOptionalObject(slogan, language),
      };

      const createdStore = await this.prisma.store.create({
        data: storeCreateData,
      });

      return await this.getOne(createdStore.id);
    } catch (error) {
      await this.deleteImagesIfExists(logoURL, backgroundURL);

      throw error;
    }
  }

  async update(storeId: number, dto: UpdateStoreDto, files: UpdateStoreFiles) {
    let logoURL: string | undefined;
    let backgroundURL: string | undefined;

    try {
      backgroundURL = await this.uploadOrReturn(files.backgroundFile);
      logoURL = await this.uploadOrReturn(files.logoFile);

      await this.deleteOldImagesIfUpdated(storeId, {
        newBackgroundURL: files.backgroundFile,
        newLogoURL: files.logoFile,
      });

      const { name, description, slogan, ...omittedDto } = omitDtoSchema(dto);
      const updatedStore = await this.prisma.store.update({
        data: {
          ...omittedDto,
          backgroundURL,
          logoURL,
          name: getMultiLangFieldUpdateObject(name),
          description: getMultiLangFieldUpdateObject(description),
          slogan: getMultiLangFieldUpdateObject(slogan),
        },
        where: { id: storeId },
      });

      return await this.getOne(updatedStore.id);
    } catch (error) {
      setImmediate(async () => {
        await this.deleteImagesIfExists(logoURL, backgroundURL);
      });

      throw error;
    }
  }

  async delete(storeId: number): Promise<void> {
    const deletedStore = await this.prisma.store.delete({
      where: { id: storeId },
    });

    const multiLangFieldsId = [
      deletedStore.nameId,
      deletedStore.sloganId,
      deletedStore.descriptionId,
    ].filter(Boolean) as number[];

    await this.translateService.deleteManyTextContent(multiLangFieldsId);
  }

  private async deleteImagesIfExists(
    logoURL: string | null | undefined,
    backgroundURL: string | null | undefined,
  ): Promise<void> {
    if (logoURL) await this.cloudinaryService.delayedDelete(logoURL);
    if (backgroundURL)
      await this.cloudinaryService.delayedDelete(backgroundURL);
  }

  private async uploadImage(file: Express.Multer.File): Promise<string> {
    return await this.cloudinaryService.uploadFile(file, 'stores');
  }

  private async uploadOrReturn(
    imageFile: Express.Multer.File[] | undefined,
  ): Promise<string | undefined> {
    return imageFile ? await this.uploadImage(imageFile[0]) : undefined;
  }

  private async deleteOldImagesIfUpdated(
    storeId: number,
    {
      newBackgroundURL,
      newLogoURL,
    }: {
      newBackgroundURL?: Express.Multer.File[];
      newLogoURL?: Express.Multer.File[];
    },
  ): Promise<void> {
    if (!newBackgroundURL && !newLogoURL) return;

    const oldStore = await this.getStoreImagesURL(storeId);

    if (newBackgroundURL && oldStore.backgroundURL) {
      this.cloudinaryService.deleteFile(oldStore.backgroundURL);
    }

    if (newLogoURL && oldStore.logoURL) {
      this.cloudinaryService.deleteFile(oldStore.logoURL);
    }
  }

  private async getStoreImagesURL(storeId: number) {
    return await this.prisma.store.findUniqueOrThrow({
      select: { logoURL: true, backgroundURL: true },
      where: { id: storeId },
    });
  }

  async getStoreOwnerIdByStoreId(storeId: number) {
    return (
      await this.prisma.store.findUniqueOrThrow({ where: { id: storeId } })
    ).storeOwnerId;
  }
}
