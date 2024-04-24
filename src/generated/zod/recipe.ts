import * as z from "zod"
import { extendZodWithOpenApi } from "@anatine/zod-openapi"
import { $Enums } from "@prisma/client"
import * as imports from "./schemas"

const zodOpenApi = extendZodWithOpenApi(z)

export const RecipeSchema = z.object({
  id: z.number().int(),
  name: z.string(),
  description: z.string(),
  iconId: z.number().int(),
  productId: z.number().int(),
  isVisible: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
  deletedAt: z.date().nullable(),
})
