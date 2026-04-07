import {
  Request,
  Response,
  NextFunction,
}
  from 'express';

  interface CustomError extends Error {
     statusCode: number;
   }

const errorHandler = (err: CustomError, _req: Request, res: Response, _next: NextFunction) => {
  console.error('Ошибка:', err.message);

  res.status(err.statusCode || 500).send(err.message);
};

export default errorHandler;
