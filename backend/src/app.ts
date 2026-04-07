import express from 'express';
import cors from 'cors';
import { connect } from 'mongoose';
import path from 'path';
import { errors } from 'celebrate';
import { PORT, DB_ADDRESS } from './config';
import productsRouter from './routes/product';
import ordersRouter from './routes/order';
import errorHandler from './middlewares/error-handler';
import { errorLogger, requestLogger } from './middlewares/logger';

const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(requestLogger);

connect(DB_ADDRESS);
app.use('/product', productsRouter);
app.use('/order', ordersRouter);
app.use(errorLogger);

app.use(errors());
app.use(errorHandler);

app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
