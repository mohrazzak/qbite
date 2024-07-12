-- CreateEnum
CREATE TYPE "DotType" AS ENUM ('ROUNDED', 'DOT', 'CLASSY', 'CLASSY_ROUNDED', 'SQUARE', 'EXTRA_ROUNDED');

-- CreateEnum
CREATE TYPE "GradientType" AS ENUM ('LINEAR', 'RADIAL');

-- CreateEnum
CREATE TYPE "CornerStyle" AS ENUM ('DOT', 'SQUARE', 'EXTRA_ROUNDED');

-- CreateEnum
CREATE TYPE "CornerDotType" AS ENUM ('DOT', 'SQUARE');

-- CreateEnum
CREATE TYPE "ColorType" AS ENUM ('SINGLE_COLOR', 'GRADIENT');

-- CreateEnum
CREATE TYPE "SubscriptionStatus" AS ENUM ('active', 'expired', 'pending');

-- CreateEnum
CREATE TYPE "IconType" AS ENUM ('RECIPE', 'CATEGORY');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN', 'STORE', 'STORE_OWNER');

-- CreateTable
CREATE TABLE "Store" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "phoneNumber" VARCHAR(19) NOT NULL,
    "isPhoneNumberVerified" BOOLEAN NOT NULL DEFAULT false,
    "nameId" INTEGER NOT NULL,
    "descriptionId" INTEGER NOT NULL,
    "sloganId" INTEGER,
    "logoURL" TEXT NOT NULL,
    "backgroundURL" TEXT,
    "visible" BOOLEAN NOT NULL DEFAULT true,
    "country" TEXT,
    "city" TEXT,
    "openingHours" TEXT NOT NULL,
    "closingHours" TEXT NOT NULL,
    "storeOwnerId" INTEGER NOT NULL,
    "primaryColor" TEXT NOT NULL,
    "secondaryColor" TEXT NOT NULL,
    "backgroundColor" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),
    "fontId" INTEGER,

    CONSTRAINT "Store_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QrCode" (
    "id" SERIAL NOT NULL,
    "storeId" INTEGER NOT NULL,
    "size" INTEGER NOT NULL,
    "hasLogo" BOOLEAN NOT NULL DEFAULT false,
    "dotsStyle" "DotType" NOT NULL DEFAULT 'DOT',
    "dotsColorType" "ColorType" NOT NULL DEFAULT 'SINGLE_COLOR',
    "dotsGradientType" "GradientType" NOT NULL DEFAULT 'LINEAR',
    "dotsColor1" TEXT NOT NULL,
    "dotsColor2" TEXT NOT NULL,
    "cornersSquaresStyle" "CornerStyle" NOT NULL DEFAULT 'SQUARE',
    "cornersSquaresColorType" "ColorType" NOT NULL DEFAULT 'SINGLE_COLOR',
    "cornersSquaresGradientType" "GradientType" NOT NULL DEFAULT 'LINEAR',
    "cornersSquaresColor1" TEXT NOT NULL,
    "cornersSquaresColor2" TEXT NOT NULL,
    "cornersDotsStyle" "CornerDotType" NOT NULL DEFAULT 'DOT',
    "cornersDotsColorType" "ColorType" NOT NULL DEFAULT 'SINGLE_COLOR',
    "cornersDotsGradientType" "GradientType" NOT NULL DEFAULT 'LINEAR',
    "cornersDotsColor1" TEXT NOT NULL,
    "cornersDotsColor2" TEXT NOT NULL,
    "backgroundColorType" "ColorType" NOT NULL DEFAULT 'SINGLE_COLOR',
    "backgroundGradientType" "GradientType" NOT NULL DEFAULT 'LINEAR',
    "backgroundColor1" TEXT NOT NULL,
    "backgroundColor2" TEXT NOT NULL,

    CONSTRAINT "QrCode_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductPrices" (
    "id" SERIAL NOT NULL,
    "productId" INTEGER NOT NULL,
    "currencyId" INTEGER NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "ProductPrices_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Font" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Font_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SocialMediaProfile" (
    "id" SERIAL NOT NULL,
    "link" TEXT NOT NULL,
    "storeId" INTEGER NOT NULL,
    "socialMediaPlatformId" INTEGER NOT NULL,

    CONSTRAINT "SocialMediaProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SocialMediaPlatform" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "iconURL" TEXT NOT NULL,

    CONSTRAINT "SocialMediaPlatform_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StoreOwner" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT,
    "role" "Role" NOT NULL DEFAULT 'STORE_OWNER',
    "lastName" TEXT,
    "password" TEXT NOT NULL,
    "phoneNumber" VARCHAR(20),
    "email" TEXT NOT NULL,
    "country" TEXT,
    "city" TEXT,
    "signupCode" TEXT NOT NULL,
    "resetPasswordToken" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT false,
    "isPhoneNumberActive" BOOLEAN NOT NULL DEFAULT false,
    "lastLogin" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "StoreOwner_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Subscription" (
    "id" SERIAL NOT NULL,
    "storeOwnerId" INTEGER NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endDate" TIMESTAMP(3) NOT NULL,
    "status" "SubscriptionStatus" NOT NULL DEFAULT 'pending',
    "price" DOUBLE PRECISION NOT NULL,
    "duration" INTEGER NOT NULL,
    "planVersionId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Subscription_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Plan" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Plan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlanVersion" (
    "id" SERIAL NOT NULL,
    "planId" INTEGER NOT NULL,
    "version" DOUBLE PRECISION NOT NULL,
    "priceForOneMonth" DOUBLE PRECISION NOT NULL,
    "priceForThreeMonths" DOUBLE PRECISION NOT NULL,
    "priceForSixMonths" DOUBLE PRECISION NOT NULL,
    "priceForOneYear" DOUBLE PRECISION NOT NULL,
    "priceForTwoYears" DOUBLE PRECISION,
    "priceForThreeYears" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "PlanVersion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Currency" (
    "id" SERIAL NOT NULL,
    "symbol" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Currency_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SupportTicket" (
    "id" SERIAL NOT NULL,
    "subject" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "storeId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "SupportTicket_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "nameId" INTEGER NOT NULL,
    "icon" TEXT,
    "storeId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Icon" (
    "id" SERIAL NOT NULL,
    "type" "IconType" NOT NULL,
    "iconURL" TEXT NOT NULL,

    CONSTRAINT "Icon_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "nameId" INTEGER NOT NULL,
    "descriptionId" INTEGER NOT NULL,
    "slug" TEXT NOT NULL,
    "isVisible" BOOLEAN NOT NULL DEFAULT true,
    "storeId" INTEGER NOT NULL,
    "categoryId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductDetails" (
    "id" SERIAL NOT NULL,
    "unitId" INTEGER NOT NULL,
    "icon" TEXT,
    "storeId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "ProductDetails_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductImages" (
    "id" SERIAL NOT NULL,
    "imageURL" TEXT NOT NULL,
    "productId" INTEGER NOT NULL,
    "isDefault" BOOLEAN NOT NULL DEFAULT false,
    "isVisible" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "ProductImages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SupportTicketImages" (
    "id" SERIAL NOT NULL,
    "imageURL" TEXT NOT NULL,
    "supportTicketId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "SupportTicketImages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DetailsOnProduct" (
    "productId" INTEGER NOT NULL,
    "productDetailsId" INTEGER NOT NULL,
    "value" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "DetailsOnProduct_pkey" PRIMARY KEY ("productId","productDetailsId")
);

-- CreateTable
CREATE TABLE "Recipe" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "iconId" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,
    "isVisible" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Recipe_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TextContent" (
    "id" SERIAL NOT NULL,
    "fallback" TEXT NOT NULL,
    "languageId" INTEGER NOT NULL,

    CONSTRAINT "TextContent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Language" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "shortcut" TEXT NOT NULL,

    CONSTRAINT "Language_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Translation" (
    "id" SERIAL NOT NULL,
    "textContentId" INTEGER NOT NULL,
    "languageId" INTEGER NOT NULL,
    "text" TEXT NOT NULL,

    CONSTRAINT "Translation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CurrencyToStore" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Store_username_key" ON "Store"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Store_nameId_key" ON "Store"("nameId");

-- CreateIndex
CREATE UNIQUE INDEX "Store_descriptionId_key" ON "Store"("descriptionId");

-- CreateIndex
CREATE UNIQUE INDEX "Store_sloganId_key" ON "Store"("sloganId");

-- CreateIndex
CREATE INDEX "Store_storeOwnerId_idx" ON "Store"("storeOwnerId");

-- CreateIndex
CREATE INDEX "Store_username_idx" ON "Store"("username");

-- CreateIndex
CREATE UNIQUE INDEX "QrCode_storeId_key" ON "QrCode"("storeId");

-- CreateIndex
CREATE UNIQUE INDEX "Font_name_key" ON "Font"("name");

-- CreateIndex
CREATE INDEX "Font_name_idx" ON "Font"("name");

-- CreateIndex
CREATE UNIQUE INDEX "StoreOwner_id_key" ON "StoreOwner"("id");

-- CreateIndex
CREATE UNIQUE INDEX "StoreOwner_phoneNumber_key" ON "StoreOwner"("phoneNumber");

-- CreateIndex
CREATE UNIQUE INDEX "StoreOwner_email_key" ON "StoreOwner"("email");

-- CreateIndex
CREATE INDEX "StoreOwner_phoneNumber_idx" ON "StoreOwner"("phoneNumber");

-- CreateIndex
CREATE INDEX "StoreOwner_email_idx" ON "StoreOwner"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Plan_name_key" ON "Plan"("name");

-- CreateIndex
CREATE UNIQUE INDEX "PlanVersion_version_planId_key" ON "PlanVersion"("version", "planId");

-- CreateIndex
CREATE UNIQUE INDEX "Currency_name_key" ON "Currency"("name");

-- CreateIndex
CREATE INDEX "Currency_name_idx" ON "Currency"("name");

-- CreateIndex
CREATE INDEX "SupportTicket_subject_idx" ON "SupportTicket"("subject");

-- CreateIndex
CREATE UNIQUE INDEX "Category_nameId_key" ON "Category"("nameId");

-- CreateIndex
CREATE INDEX "Category_nameId_storeId_idx" ON "Category"("nameId", "storeId");

-- CreateIndex
CREATE UNIQUE INDEX "Product_nameId_key" ON "Product"("nameId");

-- CreateIndex
CREATE UNIQUE INDEX "Product_descriptionId_key" ON "Product"("descriptionId");

-- CreateIndex
CREATE UNIQUE INDEX "Product_slug_storeId_key" ON "Product"("slug", "storeId");

-- CreateIndex
CREATE UNIQUE INDEX "ProductDetails_unitId_key" ON "ProductDetails"("unitId");

-- CreateIndex
CREATE UNIQUE INDEX "ProductDetails_unitId_icon_key" ON "ProductDetails"("unitId", "icon");

-- CreateIndex
CREATE INDEX "TextContent_languageId_idx" ON "TextContent"("languageId");

-- CreateIndex
CREATE UNIQUE INDEX "Language_shortcut_key" ON "Language"("shortcut");

-- CreateIndex
CREATE INDEX "Language_shortcut_idx" ON "Language"("shortcut");

-- CreateIndex
CREATE INDEX "Translation_textContentId_languageId_idx" ON "Translation"("textContentId", "languageId");

-- CreateIndex
CREATE UNIQUE INDEX "Translation_textContentId_languageId_key" ON "Translation"("textContentId", "languageId");

-- CreateIndex
CREATE UNIQUE INDEX "_CurrencyToStore_AB_unique" ON "_CurrencyToStore"("A", "B");

-- CreateIndex
CREATE INDEX "_CurrencyToStore_B_index" ON "_CurrencyToStore"("B");

-- AddForeignKey
ALTER TABLE "Store" ADD CONSTRAINT "Store_nameId_fkey" FOREIGN KEY ("nameId") REFERENCES "TextContent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Store" ADD CONSTRAINT "Store_descriptionId_fkey" FOREIGN KEY ("descriptionId") REFERENCES "TextContent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Store" ADD CONSTRAINT "Store_sloganId_fkey" FOREIGN KEY ("sloganId") REFERENCES "TextContent"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Store" ADD CONSTRAINT "Store_storeOwnerId_fkey" FOREIGN KEY ("storeOwnerId") REFERENCES "StoreOwner"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Store" ADD CONSTRAINT "Store_fontId_fkey" FOREIGN KEY ("fontId") REFERENCES "Font"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QrCode" ADD CONSTRAINT "QrCode_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Store"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductPrices" ADD CONSTRAINT "ProductPrices_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductPrices" ADD CONSTRAINT "ProductPrices_currencyId_fkey" FOREIGN KEY ("currencyId") REFERENCES "Currency"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SocialMediaProfile" ADD CONSTRAINT "SocialMediaProfile_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Store"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SocialMediaProfile" ADD CONSTRAINT "SocialMediaProfile_socialMediaPlatformId_fkey" FOREIGN KEY ("socialMediaPlatformId") REFERENCES "SocialMediaPlatform"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_storeOwnerId_fkey" FOREIGN KEY ("storeOwnerId") REFERENCES "StoreOwner"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_planVersionId_fkey" FOREIGN KEY ("planVersionId") REFERENCES "PlanVersion"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlanVersion" ADD CONSTRAINT "PlanVersion_planId_fkey" FOREIGN KEY ("planId") REFERENCES "Plan"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SupportTicket" ADD CONSTRAINT "SupportTicket_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Store"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_nameId_fkey" FOREIGN KEY ("nameId") REFERENCES "TextContent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Store"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_nameId_fkey" FOREIGN KEY ("nameId") REFERENCES "TextContent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_descriptionId_fkey" FOREIGN KEY ("descriptionId") REFERENCES "TextContent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Store"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductDetails" ADD CONSTRAINT "ProductDetails_unitId_fkey" FOREIGN KEY ("unitId") REFERENCES "TextContent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductDetails" ADD CONSTRAINT "ProductDetails_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Store"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductImages" ADD CONSTRAINT "ProductImages_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SupportTicketImages" ADD CONSTRAINT "SupportTicketImages_supportTicketId_fkey" FOREIGN KEY ("supportTicketId") REFERENCES "SupportTicket"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DetailsOnProduct" ADD CONSTRAINT "DetailsOnProduct_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DetailsOnProduct" ADD CONSTRAINT "DetailsOnProduct_productDetailsId_fkey" FOREIGN KEY ("productDetailsId") REFERENCES "ProductDetails"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TextContent" ADD CONSTRAINT "TextContent_languageId_fkey" FOREIGN KEY ("languageId") REFERENCES "Language"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Translation" ADD CONSTRAINT "Translation_textContentId_fkey" FOREIGN KEY ("textContentId") REFERENCES "TextContent"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Translation" ADD CONSTRAINT "Translation_languageId_fkey" FOREIGN KEY ("languageId") REFERENCES "Language"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CurrencyToStore" ADD CONSTRAINT "_CurrencyToStore_A_fkey" FOREIGN KEY ("A") REFERENCES "Currency"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CurrencyToStore" ADD CONSTRAINT "_CurrencyToStore_B_fkey" FOREIGN KEY ("B") REFERENCES "Store"("id") ON DELETE CASCADE ON UPDATE CASCADE;
