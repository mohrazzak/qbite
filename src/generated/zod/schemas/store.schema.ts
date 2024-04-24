import { z } from 'zod';

export const storeName = z
  .string()
  .min(3)
  .max(50)
  .refine((value) => {
    const allowedCharacters = /^[a-zA-Z\s'-]+$/;
    return allowedCharacters.test(value);
  });

export const storeDescription = z
  .string()
  .min(3)
  .max(100)
  .refine((value) => {
    const allowedCharacters = /^[a-zA-Z\s'-]+$/;
    return allowedCharacters.test(value);
  });
