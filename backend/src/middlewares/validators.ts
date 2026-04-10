import { celebrate, Joi, Segments } from 'celebrate';
import { Types } from 'mongoose';

const orderValidationSchema = Joi.object({
  items: Joi.array()
    .min(1)
    .items(Joi.string().custom((value, helpers) => {
      if (Types.ObjectId.isValid(value)) {
        return value;
      }
      return helpers.message({ custom: 'Невалидный ID товара' });
    }))
    .messages({
      'array.min': 'В заказ не добавлены товары',
    }),
  total: Joi.number().required(),
  payment: Joi.string()
    .valid('card', 'online')
    .required()
    .messages({
      'string.valid': 'Выбран неверный способ оплаты. Возможные варианты: card, online',
      'any.required': 'Укажите способ оплаты',
    }),
  email: Joi.string().email().required()
    .messages({
      'string.empty': 'Укажите адрес электронной почты',
      'string.email': 'Невалидный e-mail',
    }),
  phone: Joi.string().required()
    .messages({
      'string.empty': 'Укажите контактный телефон',
    }),
  address: Joi.string().required()
    .messages({
      'string.empty': 'Укажите адрес доставки',
    }),
});

const productValidationSchema = Joi.object({
  title: Joi.string()
    .min(2)
    .max(30)
    .required()
    .messages({
      'string.min': 'В названии товара должно быть хотя бы 2 символа',
      'string.max': 'Название товара не может быть длиннее 30 символов',
      'any.required': 'Введите название товара',
    }),
  image: Joi.object({
    fileName: Joi.string().required()
      .messages({
        'any.required': 'Не добавлен файл изображения',
      }),
    originalName: Joi.string().required()
      .messages({
        'any.required': 'Укажите название изображения',
      }),
  }),
  category: Joi.string()
    .valid('софт-скил', 'хард-скил', 'другое', 'дополнительное', 'кнопка')
    .required()
    .messages({
      'any.required': 'Не указана категория товара',
    }),
  description: Joi.string(),
  price: Joi.number()
    .default(0),
});

export const validateOrder = celebrate({
  [Segments.BODY]: orderValidationSchema,
});

export const validateProduct = celebrate({
  [Segments.BODY]: productValidationSchema,
});
