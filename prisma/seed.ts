import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import * as bcrypt from 'bcryptjs';
import { addDays } from 'date-fns';
const isProduction = process.env.NODE_ENV === 'production';

async function main() {
  await prisma.language.upsert({
    where: { id: 1 },
    create: {
      name: 'English',
      shortcut: 'en',
    },
    update: {},
  });

  await prisma.language.upsert({
    where: { id: 2 },
    create: {
      name: 'العربية',
      shortcut: 'ar',
    },
    update: {},
  });

  await prisma.currency.upsert({
    where: { id: 1 },
    update: {},
    create: {
      symbol: '$',
      name: 'United States Dollar',
    },
  });

  await prisma.currency.upsert({
    where: { id: 2 },
    update: {},
    create: {
      symbol: '₺',
      name: 'Turkish Lira',
    },
  });

  await prisma.plan.upsert({
    where: { id: 1 },
    create: { name: 'Premium' },
    update: {},
  });

  await prisma.planVersion.create({
    data: {
      planId: 1,
      priceForOneMonth: 14.99,
      priceForThreeMonths: 12.99,
      priceForSixMonths: 9.99,
      priceForOneYear: 7.99,
      version: 0.01,
    },
  });

  await prisma.storeOwner.upsert({
    where: { id: 1 },
    update: {},
    create: {
      email: 'qbite.it@gmail.com',
      password: await bcrypt.hash('Test1234@', 10),
      signupCode: '9999',
      isActive: true,
    },
  });

  await prisma.subscription.upsert({
    where: { id: 1 },
    update: {},
    create: {
      storeOwnerId: 1,
      duration: 60,
      endDate: addDays(new Date(), 60),
      startDate: new Date(),
      planVersionId: 1,
      price: 0,
      status: 'active',
    },
  });

  await prisma.textContent.upsert({
    where: { id: 1 },
    create: {
      languageId: 1,
      fallback: 'QBite',
      translations: {
        create: [{ languageId: 2, text: 'كيو بايت' }],
      },
    },
    update: {},
  });

  await prisma.textContent.upsert({
    where: { id: 2 },
    create: {
      languageId: 1,
      fallback:
        'QBite is a restaurant management system, focused on restaurants and delivering e-menus for restaurants across world wide.',
      translations: {
        create: [
          {
            languageId: 2,
            text: 'كيو بايت هو نظام إدارة مطاعم, مركّز على المطاعم وإيصال قائمة الطعام للمطاعم في جميع أنحاء العالم.',
          },
        ],
      },
    },
    update: {},
  });

  const store = await prisma.store.upsert({
    where: { id: 1 },
    update: {},
    create: {
      backgroundColor: '#ffff',
      username: 'qbite',
      closingHours: '00:00',
      logoURL: '',
      openingHours: '08:00',
      phoneNumber: '+905388977939',
      primaryColor: '#f7f7',
      secondaryColor: '#f2f7',
      descriptionId: 2,
      nameId: 1,
      storeOwnerId: 1,
    },
  });

  const caloryUnit = await prisma.productDetails.upsert({
    create: {
      unit: {
        create: {
          fallback: 'Calory',
          languageId: 1,
          translations: { create: { text: 'كالوري', languageId: 2 } },
        },
      },
      icon: '🔥',
    },
    update: {},
    where: { id: 1 },
  });

  const minuteUnit = await prisma.productDetails.upsert({
    create: {
      unit: {
        create: {
          fallback: 'Minute',
          languageId: 1,
          translations: { create: { text: 'دقيقة', languageId: 2 } },
        },
      },
      icon: '⏱️',
    },
    update: {},
    where: { id: 2 },
  });

  await prisma.product.upsert({
    create: {
      store: { connect: { id: store.id } },
      category: {
        create: {
          name: {
            create: {
              fallback: 'Burger',
              translations: { create: { text: 'برجر', languageId: 2 } },
              languageId: 1,
            },
          },
          store: { connect: { id: 1 } },
        },
      },
      slug: 'cheese-burger',
      name: {
        create: {
          fallback: 'Cheese Burger',
          translations: {
            create: [{ text: 'تشيز برجر', languageId: 2 }],
          },
          languageId: 1,
        },
      },
      images: { create: { imageURL: 'google.com/test' } },
      details: {
        createMany: {
          data: [
            { productDetailsId: caloryUnit.id, value: '100' },
            { productDetailsId: minuteUnit.id, value: '10' },
          ],
        },
      },
      description: {
        create: {
          fallback: 'Best burger you may have',
          translations: {
            create: [{ text: 'افضل برجر يمكنك تناولها', languageId: 2 }],
          },
          languageId: 1,
        },
      },
      prices: { create: { price: 20, currencyId: 2 } },
    },
    update: {},
    where: { id: 1 },
  });

  await prisma.socialMediaPlatform.upsert({
    where: { id: 1 },
    create: {
      name: 'Facebook',
      iconURL: '', // TODO
    },
    update: {},
  });

  await prisma.socialMediaPlatform.upsert({
    where: { id: 2 },
    create: {
      name: 'Instagram',
      iconURL: '', // TODO
    },
    update: {},
  });

  await prisma.socialMediaPlatform.upsert({
    where: { id: 3 },
    create: {
      name: 'X',
      iconURL: '', // TODO
    },
    update: {},
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
