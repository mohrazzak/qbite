export const MultiLangFieldSelect = {
  select: {
    id: true,
    languageId: true,
    fallback: true,
    translations: {
      select: { id: true, languageId: true, text: true, textContentId: true },
    },
  },
};
