import { z } from 'zod';

const regexPhoneNumber = /^\+380\d{2}\d{3}\d{2}\d{2}$/;
const regexName = /^([a-zA-ZА-Яа-яЁёЇїІіЄєҐґ'\-\s]+)$/;
const regexAddress = /^([a-zA-ZА-Яа-яЁёЇїІіЄєҐґ'\d\s\-\.]*)$/; //letters, numbers, whitespace character,"-","."
const regexPassword =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/; //at least 1 UpperLetter 1 lowerLetter 1 special symbol? min 8 symbols

export const userInfoZodSchema = z.object({
  last_name: z
    .string()
    .max(100, { message: 'Поле може міститити не більше 100 символів' })
    .regex(regexName, { message: 'Поле має містити тільки літери' })
    .or(z.string().max(0))
    .nullish(),
  first_name: z
    .string()
    .max(100, { message: 'Поле може міститити не більше 100 символів' })
    .regex(regexName, { message: 'Поле має містити тільки літери' })
    .or(z.string().max(0))
    .nullish(),
  phone: z
    .string()
    .max(17, { message: 'Поле має містити не більше 17 символів' })
    .regex(regexPhoneNumber, {
      message: 'Поле має складатися з цифр у форматі +380XXXXXXXXX',
    })
    .or(z.string().max(0))
    .nullish(),
  email: z
    .string({
      required_error: "Це поле обов'язкове",
    })
    .email({ message: 'Email адреса вказана неправильно' }),
  delivery_address: z.object({
    city: z
      .string()
      .max(50)
      .regex(regexAddress, { message: 'Адреса містить недопустимі символи' })
      .or(z.string().max(0))
      .nullish(),
    street: z
      .string()
      .max(50)
      .regex(regexAddress, {
        message: 'Адреса містить недопустимі символи',
      })
      .or(z.string().max(0))
      .nullish(),
    house: z
      .string()
      .max(50)
      .regex(regexAddress, {
        message: 'Адреса містить недопустимі символи',
      })
      .or(z.string().max(0))
      .nullish(),
    apartment: z
      .string()
      .max(50)
      .regex(regexAddress, {
        message: 'Адреса містить недопустимі символи',
      })
      .or(z.string().max(0))
      .nullish(),
  }),
  activity: z.enum([
    'Не вказувати',
    'Електрик',
    'Дизайнер',
    'Виконроб',
    'Будівельна організація',
  ]),
});

export const changePasswordZodSchema = z
  .object({
    old_password: z
      .string()
      .min(8, { message: 'Пароль має містити не меньше 8 символів' }),
    new_password: z
      .string()
      .min(8, { message: 'Пароль має містити не меньше 8 символів' })
      .regex(regexPassword, {
        message:
          'Пароль має містити щонайменьше одну заглавну літеру та один спеціальний символ',
      }),
    repeat_new_password: z
      .string()
      .min(8, { message: 'Пароль має містити не меньше 8 символів' })
      .regex(regexPassword, {
        message:
          'Пароль має містити щонайменьше одну заглавну літеру та один спеціальний символ',
      }),
  })
  .refine((obj) => obj.new_password === obj.repeat_new_password, {
    message: 'Пароль має співпадати',
    path: ['repeat_new_password'],
  });

export const reviewTextZodSchema = z.object({
  review: z
    .string()
    .min(1, { message: 'Відгук має містити не меньше одного символа' })
    .max(4999, { message: 'Максимальна кількість символів 4999' }),
});
