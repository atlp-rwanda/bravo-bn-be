import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import globalErrorHandler from './controllers/error';
import AppError from './utils/appError';
import allRoutes from './routers/index';
import path from 'path';

const app = express();

app.use('/chat', express.static(path.join(__dirname, './public/chat')));
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(allRoutes);

app.all('*', (req, res, next) => {
  next(
    new AppError(`Opps! can't find "${req.originalUrl}" on this server!`, 404),
  );
});

app.all('*', (req, res, next) => {
  next(
    new AppError(`Opps! can't find "${req.originalUrl}" on this server!`, 404),
  );
});

app.use(globalErrorHandler);

export default app;
