import * as z from "zod"
import { extendZodWithOpenApi } from "@anatine/zod-openapi"
import { $Enums } from "@prisma/client"
import * as imports from "./schemas"

const zodOpenApi = extendZodWithOpenApi(z)

export const SocialMediaProfileSchema = z.object({
  id: z.number().int(),
  link: z.string(),
  storeId: z.number().int(),
  socialMediaPlatformId: z.number().int(),
})
