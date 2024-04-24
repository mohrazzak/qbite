import * as z from "zod"
import { extendZodWithOpenApi } from "@anatine/zod-openapi"
import { $Enums } from "@prisma/client"
import * as imports from "./schemas"

const zodOpenApi = extendZodWithOpenApi(z)

export const StoreSchema = z.object({
  id: z.number().int(),
  username: z.custom().and(imports.usernameSchema),
  phoneNumber: z.string(),
  isPhoneNumberVerified: z.boolean(),
  nameId: z.number().int(),
  descriptionId: z.number().int(),
  sloganId: z.number().int().nullable(),
  logoURL: z.string(),
  backgroundURL: z.string().nullable(),
  visible: z.boolean(),
  country: z.string().nullable(),
  city: z.string().nullable(),
  openingHours: z.string(),
  closingHours: z.string(),
  storeOwnerId: z.number().int(),
  primaryColor: z.string(),
  secondaryColor: z.string(),
  backgroundColor: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  deletedAt: z.date().nullable(),
  fontId: z.coerce.number().transform((arg) => (arg === 0 ? undefined : arg)).nullable(),
})
