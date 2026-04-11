import { NextFunction, Request, Response } from 'express';
import { nanoid } from 'nanoid';
import { Types } from 'mongoose';
import { Product, IProduct } from '../models/product';
import NotFoundError from '../errors/not-found-error';
import BadRequestError from '../errors/bad-request-error';
import HttpCodes from '../errors/codes';

const createOrder = async (req: Request, res: Response, next: NextFunction) => {
  const { items, total } = req.body;

  if (new Set(items).size !== items.length) {
    return next(new BadRequestError('В заказе есть дубликаты одного или нескольких товаров'));
  }

  const ids = items.map((id: string) => new Types.ObjectId(id));

  try {
    const products = await Product.find<IProduct>({ _id: { $in: ids } });
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

    return res.status(HttpCodes.OK).send({ total, id: nanoid() });
  } catch (err) {
    return next(err);
  }
};

export default createOrder;
