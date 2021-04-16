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
// Rota estatica de apresentação de dados (imagens)

app.use(routes);
// Todas as rotas

app.use((error: Error, request: Request, response: Response, next: NextFunction) => {
  // Middleware de erros
  if (error instanceof AppError) {
    // Caso o erro veio de uma instacia da classe AppError, ele é um erro da aplicação
    // ou seja, ele é trattado
    return response.status(error.statusCode).json({
      status: 'error =(',
      message: error.message,
    });
  }
  // caso contrario, é um erro nao previsto

  return response.status(500).json({
    status: 'error =(',
    message: 'Internal Server Error',
  });
});
app.listen(3335, () => {
  console.log('Server is Started!!!');
});
