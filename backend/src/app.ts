import express from 'express';
import cors from 'cors';
import { connect } from 'mongoose';
import path from 'path';
import { errors } from 'celebrate';
import { PORT, DB_ADDRESS } from './config';
import productsRouter from './routes/product';
import ordersRouter from './routes/order';
import { errorHandler, notFoundErrorHandler } from './middlewares/error-handler';
import { errorLogger, requestLogger } from './middlewares/logger';

const app = express();
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(requestLogger);
app.use('/product', productsRouter);
app.use('/order', ordersRouter);
app.use(notFoundErrorHandler);
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

if (DB_ADDRESS !== undefined) {
  connect(DB_ADDRESS)
    .then(() => app.listen(PORT, () => {
      console.log(`Listening on port ${PORT}`);
    }))
    .catch((err) => console.log(err));
} else {
  console.error('DB_ADDRESS is not defined!');
}
