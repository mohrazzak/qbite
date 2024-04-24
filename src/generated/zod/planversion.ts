import * as z from "zod"
import { extendZodWithOpenApi } from "@anatine/zod-openapi"
import { $Enums } from "@prisma/client"
import * as imports from "./schemas"

const zodOpenApi = extendZodWithOpenApi(z)

export const PlanVersionSchema = z.object({
  id: z.number().int(),
  planId: z.number().int(),
  version: z.number(),
  priceForOneMonth: z.number(),
  priceForThreeMonths: z.number(),
  priceForSixMonths: z.number(),
  priceForOneYear: z.number(),
  priceForTwoYears: z.number().nullable(),
  priceForThreeYears: z.number().nullable(),
  createdAt: z.date().default(new Date()),
  updatedAt: z.date().default(new Date()),
  deletedAt: z.date().nullable().default(new Date()).nullable(),
})
