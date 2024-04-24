import { createZodDto } from '@anatine/zod-nestjs';
import { TextContentSchema, TranslationSchema } from 'src/generated';
import { z } from 'zod';

export const MultiLangFieldSchema = TextContentSchema.merge(
  z.object({
    translations: z.array(
      TranslationSchema.omit({ textContentId: true }).partial({ id: true }),
    ),
  }),
);

export class MultiLangFieldDto extends createZodDto(MultiLangFieldSchema) {}
