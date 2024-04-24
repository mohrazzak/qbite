import * as z from "zod"
import { extendZodWithOpenApi } from "@anatine/zod-openapi"
import { $Enums } from "@prisma/client"
import * as imports from "./schemas"
import { IconType } from "./enums"

const zodOpenApi = extendZodWithOpenApi(z)

export const IconSchema = z.object({
  id: z.number().int(),
  type: z.nativeEnum($Enums.IconType),
  iconURL: z.string(),
})
