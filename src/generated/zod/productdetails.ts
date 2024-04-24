import * as z from "zod"
import { extendZodWithOpenApi } from "@anatine/zod-openapi"
import { $Enums } from "@prisma/client"
import * as imports from "./schemas"

const zodOpenApi = extendZodWithOpenApi(z)

export const ProductDetailsSchema = z.object({
  id: z.number().int(),
  unitId: z.number().int(),
  icon: z.string().nullable(),
  storeId: z.number().int().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
  deletedAt: z.date().nullable(),
})
