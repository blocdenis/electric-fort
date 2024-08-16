import { z } from 'zod';

const regexPhoneNumber = /^\+380\d{3}\d{2}\d{2}\d{2}$/;
const regexName = /^([a-zA-ZА-Яа-яЁёЇїІіЄєҐґ']+)$/;
const regexAddress =
  /^([a-zA-ZА-Яа-яЁёЇїІіЄєҐґ']+[-]?[a-zA-ZА-Яа-яЁёЇїІіЄєҐґ']*[\s]?[a-zA-ZА-Яа-яЁёЇїІіЄєҐґ']*[-]?[a-zA-ZА-Яа-яЁёЇїІіЄєҐґ']*)$/; // city from letters posible with "-", can contain two words with " " in the middle
const regexHouseAndApartment = /^\d+[\s]?[a-zA-ZА-Яа-яЁёЇїІіЄєҐґ']?$/;
const regexPassword =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/; //at least 1 UpperLetter 1 lowerLetter 1 special symbol? min 8 symbols

export const userInfoZodSchema = z.object({
  last_name: z
    .string()
    .max(50)
    .regex(regexName, { message: "Ім'я має містити тільки літери" })
    .or(z.string().max(0)),
  first_name: z
    .string()
    .max(50)
    .regex(regexName, { message: "Ім'я має містити тільки літери" })
    .or(z.string().max(0)),
  phone: z
    .string()
    .max(13, { message: 'Має містити не більше 13 символів' })
    .regex(regexPhoneNumber, {
      message: 'Має складатися з цифр у форматі +380ХХХХХХХХХ',
    })
    .or(z.string().max(0)),
  email: z
    .string({
      required_error: 'Це поле обов&apos;язкове',
    })
    .email({ message: 'Email адреса вказана неправильно' }),
  delivery_address: z.object({
    city: z
      .string()
      .max(50)
      .regex(regexAddress, { message: "Має містити тільки літери та '-'" })
      .or(z.string().max(0)),
    street: z
      .string()
      .max(50)
      .regex(regexAddress, { message: "Може містити тільки літери та '-'" })
      .or(z.string().max(0)),
    house: z
      .string()
      .max(50)
      .regex(regexHouseAndApartment, {
        message: 'Може містити тільки цифри та одну літеру',
      })
      .or(z.string().max(0)),
    apartment: z
      .string()
      .max(50)
      .regex(regexHouseAndApartment, {
        message: 'Може містити тільки цифри та одну літеру',
      })
      .or(z.string().max(0)),
  }),
  activity: z.enum([
    'Не вказувати',
    'Електрик',
    'Дизайнер',
    'Виконроб',
    'Будівельна організація',
  ]),
});

export const changePasswordZodSchema = z.object({
  old_password: z.string().min(8).regex(regexPassword),
  new_password: z.string().min(8).regex(regexPassword),
  repeat_new_password: z.string().min(8).regex(regexPassword),
});
