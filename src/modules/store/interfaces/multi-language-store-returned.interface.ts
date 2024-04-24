import { StoreEntity } from '../entity';

export interface MultiLanguageStoreReturned {
  store: StoreEntity;
  fallbackMsg: string | null;
}
