import * as z from "zod"
import { extendZodWithOpenApi } from "@anatine/zod-openapi"
import { $Enums } from "@prisma/client"
import * as imports from "./schemas"

const zodOpenApi = extendZodWithOpenApi(z)

export const ProductSchema = z.object({
  id: z.number().int(),
  nameId: z.number().int(),
  descriptionId: z.number().int(),
  slug: z.string(),
  isVisible: z.boolean(),
  storeId: z.coerce.number(),
  categoryId: z.coerce.number().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
  deletedAt: z.date().nullable(),
})
