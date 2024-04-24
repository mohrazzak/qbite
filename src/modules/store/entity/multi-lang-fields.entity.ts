import { StoreSchema } from 'src/generated';
import { ModelFields } from 'src/shared';

export const multiLangFields: ModelFields<typeof StoreSchema> = [
  'nameId',
  'descriptionId',
  'sloganId',
];
