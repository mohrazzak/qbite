import * as z from "zod"
import { extendZodWithOpenApi } from "@anatine/zod-openapi"
import { $Enums } from "@prisma/client"
import * as imports from "./schemas"
import { Role } from "./enums"

const zodOpenApi = extendZodWithOpenApi(z)

export const StoreOwnerSchema = z.object({
  id: z.number().int(),
  firstName: z.string().min(3).max(20).nullable().default("John").nullable(),
  role: z.nativeEnum($Enums.Role),
  lastName: z.string().min(3).max(20).nullable().default("Doe").nullable(),
  password: z.any().and(imports.passwordSchema),
  phoneNumber: z.any().and(imports.phoneNumberSchema).nullable(),
  email: z.any().and(imports.emailSchema),
  country: z.string().min(2).max(20).nullable().default("SY").nullable(),
  city: z.string().min(2).max(20).nullable().default("Aleppo").nullable(),
  signupCode: z.string().length(4).default('1234'),
  resetPasswordToken: z.string().nullable(),
  isActive: z.boolean().default(false),
  isPhoneNumberActive: z.boolean().default(false),
  lastLogin: z.date().nullable().default(new Date()).nullable(),
  createdAt: z.date().default(new Date()),
  updatedAt: z.date().default(new Date()),
  deletedAt: z.date().nullable().default(new Date()).nullable(),
})
