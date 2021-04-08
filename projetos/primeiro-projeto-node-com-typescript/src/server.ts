import 'reflect-metadata';
import express from 'express';
import routes from './routes';
import './database';
import upload from './config/upload';

const app = express();
app.use(express.json());

app.use(routes);

app.use('/files', express.static(upload.directory));

app.listen(3335, () => {
  console.log('Server is Started!!!');
});
