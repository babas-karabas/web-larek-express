import {
  Request,
  Response,
  NextFunction,
  ErrorRequestHandler,
}
  from 'express';
import NotFoundError from '../errors/not-found-error';
import HttpCodes from '../errors/codes';

  interface CustomError extends Error {
     statusCode: number;
   }

export const errorHandler: ErrorRequestHandler = (
  err: CustomError,
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  res.status(err.statusCode || HttpCodes.INTERNAL_SERVER_ERROR).send(err.message);
  next();
};

export const notFoundErrorHandler: ErrorRequestHandler = (
  _err: CustomError,
  _req: Request,
  _res: Response,
  next: NextFunction,
) => next(new NotFoundError('Страница не найдена'));
