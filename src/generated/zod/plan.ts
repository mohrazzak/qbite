import * as z from "zod"
import { extendZodWithOpenApi } from "@anatine/zod-openapi"
import { $Enums } from "@prisma/client"
import * as imports from "./schemas"

const zodOpenApi = extendZodWithOpenApi(z)

export const PlanSchema = z.object({
  id: z.number().int(),
  name: z.string(),
  createdAt: z.date().default(new Date()),
  updatedAt: z.date().default(new Date()),
  deletedAt: z.date().nullable().default(new Date()).nullable(),
})
