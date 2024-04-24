import * as z from "zod"
import { extendZodWithOpenApi } from "@anatine/zod-openapi"
import { $Enums } from "@prisma/client"
import * as imports from "./schemas"
import { SubscriptionStatus } from "./enums"

const zodOpenApi = extendZodWithOpenApi(z)

export const SubscriptionSchema = z.object({
  id: z.number().int(),
  storeOwnerId: z.number().int(),
  startDate: z.date(),
  endDate: z.date(),
  status: z.nativeEnum($Enums.SubscriptionStatus),
  price: z.number(),
  duration: z.number().int(),
  planVersionId: z.number().int(),
  createdAt: z.date().default(new Date()),
  updatedAt: z.date().default(new Date()),
  deletedAt: z.date().nullable().default(new Date()).nullable(),
})
