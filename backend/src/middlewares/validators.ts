import { celebrate, Joi, Segments } from 'celebrate';

const orderValidationSchema = Joi.object({
  items: Joi.array()
    .min(1)
    .items(Joi.string().required())
    .required(),
  total: Joi.number().required(),
  payment: Joi.string()
    .valid('card', 'online')
    .required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
  address: Joi.string().required(),
});

const productValidationSchema = Joi.object({
  title: Joi.string()
    .min(2)
    .max(30)
    .required(),
  image: Joi.object({
    fileName: Joi.string().required(),
    originalName: Joi.string().required(),
  }),
  category: Joi.string()
    .valid('софт-скил', 'хард-скил', 'другое', 'дополнительное', 'кнопка')
    .required(),
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
