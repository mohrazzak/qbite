import * as z from "zod"
import { extendZodWithOpenApi } from "@anatine/zod-openapi"
import { $Enums } from "@prisma/client"
import * as imports from "./schemas"

const zodOpenApi = extendZodWithOpenApi(z)

export const LanguageSchema = z.object({
  id: z.number().int(),
  name: z.string(),
  shortcut: z.custom().and(imports.ShortcutSchema),
})
