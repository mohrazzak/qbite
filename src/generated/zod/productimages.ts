import * as z from "zod"
import { extendZodWithOpenApi } from "@anatine/zod-openapi"
import { $Enums } from "@prisma/client"
import * as imports from "./schemas"

const zodOpenApi = extendZodWithOpenApi(z)

export const ProductImagesSchema = z.object({
  id: z.number().int(),
  imageURL: z.string(),
  productId: z.number().int(),
  isDefault: z.boolean(),
  isVisible: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
  deletedAt: z.date().nullable(),
})
