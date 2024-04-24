import { Injectable } from '@nestjs/common';
import { StoreModel } from '../models';
import { StoreEntity } from '../entity';

@Injectable()
export class StoreEntityMapper {
  modelToEntity(storeOwner: StoreModel): StoreEntity {
    return StoreEntity.zodSchema.parse(storeOwner);
  }
}
