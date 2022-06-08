import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import router from './routers/index';
import globalErrorHandler from './controllers/error';
import AppError from './utils/appError';
import morgan from 'morgan';
const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use(router);


app.all('*', (req, res, next) => {
    next(
        new AppError(`Opps! can't find "${req.originalUrl}" on this server!`, 404)
    );
});  

app.use(globalErrorHandler);

export default app;
