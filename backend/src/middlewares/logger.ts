import { format, transports } from 'winston';
import expressWinston from 'express-winston';

export const requestLogger = expressWinston.logger({
  level: 'info',
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    format.json(),
  ),
  transports: [
    new transports.File({ filename: 'request.log' }),
  ],
});

export const errorLogger = expressWinston.errorLogger({
  level: 'error',
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    format.json(),
  ),
  transports: [
    new transports.File({ filename: 'error.log' }),
  ],
});
