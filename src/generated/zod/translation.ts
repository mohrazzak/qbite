import * as z from "zod"
import { extendZodWithOpenApi } from "@anatine/zod-openapi"
import { $Enums } from "@prisma/client"
import * as imports from "./schemas"

const zodOpenApi = extendZodWithOpenApi(z)

export const TranslationSchema = z.object({
  id: z.number().int(),
  textContentId: z.number().int(),
  languageId: z.number().int(),
  text: z.string(),
})
