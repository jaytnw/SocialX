
import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes';
import { errorHandler } from './utils/ErrorHandler';
import config from './configs/app';
import morgan from 'morgan';


const app: Express = express();

app.use(express.json());

const allowedOrigins = ['http://localhost:5173', 'http://127.0.0.1:5173'];
const corsOptions = {
  origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};
app.use(cors(corsOptions));
app.use(morgan('dev'));

app.use('/auth', authRoutes);
app.use(errorHandler);


app.listen(config.port, () => {
    console.log(`Server is running on port ${config.port}`);
  });