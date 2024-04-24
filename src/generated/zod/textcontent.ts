import * as z from "zod"
import { extendZodWithOpenApi } from "@anatine/zod-openapi"
import { $Enums } from "@prisma/client"
import * as imports from "./schemas"

const zodOpenApi = extendZodWithOpenApi(z)

export const TextContentSchema = z.object({
  id: z.number().int(),
  fallback: z.string(),
  languageId: z.number().int(),
})
