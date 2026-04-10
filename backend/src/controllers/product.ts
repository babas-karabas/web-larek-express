import { Request, Response, NextFunction } from 'express';
import { Error as MongooseError } from 'mongoose';
import { Product } from '../models/product';
import NotFoundError from '../errors/not-found-error';
import BadRequestError from '../errors/bad-request-error';
import ConflictError from '../errors/conflict-error';
import HttpCodes from '../errors/codes';
import normalizeErrorMessages from '../errors/normalizeErrorMessages';

export const getAllProducts = async (_req: Request, res: Response, next: NextFunction) => {
  Product.find({})
    .then((products) => {
      if (!products) {
        return next(new NotFoundError('Товары не найдены'));
      }
      return res.status(HttpCodes.OK).send({ items: products, total: products.length });
    })
    .catch((err) => next(err));
};

export const createProduct = async (req: Request, res: Response, next: NextFunction) => {
  const {
    description, image, title, category, price,
  } = req.body;

  Product.create({
    description, image, title, category, price,
  })
    .then((product) => res.status(HttpCodes.CREATED).send(product))
    .catch((err) => {
      if (err instanceof MongooseError.ValidationError) {
        return next(new BadRequestError(normalizeErrorMessages(err)));
      }

      if (err instanceof Error && err.message.includes('E11000')) {
        return next(new ConflictError(err.message));
      }
      return next(err);
    });
};
