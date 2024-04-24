import * as z from "zod"
import { extendZodWithOpenApi } from "@anatine/zod-openapi"
import { $Enums } from "@prisma/client"
import * as imports from "./schemas"
import { DotType, ColorType, GradientType, CornerStyle, CornerDotType } from "./enums"

const zodOpenApi = extendZodWithOpenApi(z)

export const QrCodeSchema = z.object({
  id: z.number().int(),
  storeId: z.number().int(),
  size: z.coerce.number(),
  hasLogo: z.boolean(),
  dotsStyle: z.nativeEnum($Enums.DotType),
  dotsColorType: z.nativeEnum($Enums.ColorType),
  dotsGradientType: z.nativeEnum($Enums.GradientType),
  dotsColor1: z.string(),
  dotsColor2: z.string(),
  cornersSquaresStyle: z.nativeEnum($Enums.CornerStyle),
  cornersSquaresColorType: z.nativeEnum($Enums.ColorType),
  cornersSquaresGradientType: z.nativeEnum($Enums.GradientType),
  cornersSquaresColor1: z.string(),
  cornersSquaresColor2: z.string(),
  cornersDotsStyle: z.nativeEnum($Enums.CornerDotType),
  cornersDotsColorType: z.nativeEnum($Enums.ColorType),
  cornersDotsGradientType: z.nativeEnum($Enums.GradientType),
  cornersDotsColor1: z.string(),
  cornersDotsColor2: z.string(),
  backgroundColorType: z.nativeEnum($Enums.ColorType),
  backgroundGradientType: z.nativeEnum($Enums.GradientType),
  backgroundColor1: z.string(),
  backgroundColor2: z.string(),
})
