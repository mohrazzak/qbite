import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { StoreOwnerModel } from '../models';
import { StoreOwnerEntity, StoreOwnerSignInEntity } from '../entity';

@Injectable()
export class StoreOwnerEntityMapper {
  constructor(private readonly prismaService: PrismaService) {}

  modelToEntity(storeOwner: StoreOwnerModel): StoreOwnerEntity {
    return StoreOwnerEntity.zodSchema.parse(storeOwner);
  }

  modelToSignInEntity(storeOwner: StoreOwnerModel): StoreOwnerSignInEntity {
    return StoreOwnerSignInEntity.zodSchema.parse(storeOwner);
  }
}
