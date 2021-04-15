import 'reflect-metadata';
import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import routes from './routes';
import './database';
import upload from './config/upload';
import AppError from './errors/AppError';

const app = express();
app.use(express.json());

app.use('/files', express.static(upload.directory));
app.use(routes);

app.use((error: Error, request: Request, response: Response, next: NextFunction) => {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: 'error =(',
      message: error.message,
    });
  }
  return response.status(500).json({
    status: 'error =(',
    message: 'Internal Server Error',
  });
});
app.listen(3335, () => {
  console.log('Server is Started!!!');
});
