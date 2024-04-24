import * as z from "zod"
import { extendZodWithOpenApi } from "@anatine/zod-openapi"
import { $Enums } from "@prisma/client"
import * as imports from "./schemas"

const zodOpenApi = extendZodWithOpenApi(z)

export const ProductPricesSchema = z.object({
  id: z.number().int(),
  productId: z.number().int(),
  currencyId: z.number().int(),
  price: z.number(),
})
