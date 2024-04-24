import { StoreEntity } from '../entity';

export type StoreEntityWithoutMultiLanguageFields = Omit<
  Omit<Omit<StoreEntity, 'name'>, 'slogan'>,
  'description'
>;
