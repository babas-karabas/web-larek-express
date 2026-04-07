import { NextFunction, Request, Response } from 'express';
import { nanoid } from 'nanoid';
import { Types, Error as MongooseError } from 'mongoose';
import Product from '../models/product';
import NotFoundError from '../errors/not-found-error';
import BadRequestError from '../errors/bad-request-error';

const createOrder = async (req: Request, res: Response, next: NextFunction) => {
  const { items, total } = req.body;

  const ids = items.map((id: string) => new Types.ObjectId(id));

  Product.find({ _id: { $in: ids } })
    .then((products) => {
      if (new Set(items).size !== items.length) {
        return next(new BadRequestError('В заказе есть дубликаты одного или нескольких товаров'));
      }

      if (!products) {
        return next(new NotFoundError('Товары не найдены'));
      }

      if (products.length !== items.length) {
        return next(new NotFoundError('Некоторые товары не найдены'));
      }
      if (products.some((p) => p.price === null)) {
        return next(new BadRequestError('Один или несколько товаров не продаются'));
      }

      const calculatedTotal = products.reduce((sum, p) => sum + p.price, 0);

      if (calculatedTotal !== total) {
        return next(new BadRequestError('Сумма заказа не совпадает с суммарной стоимостью товаров'));
      }

      const id = nanoid();
      return res.status(201).send({ total, id });
    })

    .catch((err) => {
      if (err instanceof MongooseError.ValidationError) {
        return next(new BadRequestError(err.message));
      }
      return next(err);
    });
};

export default createOrder;
