
import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from "helmet";
import postRouter from './routes/postRoutes';
import { errorHandler } from './utils/ErrorHandler';
import config from './configs/app';
import morgan from 'morgan';
import { authenticateToken } from './middleware/authMiddleware';
import tagRouter from './routes/tagRoutes';

const app: Express = express();

app.use(express.json());
app.use(helmet());


const allowedOrigins = ['http://localhost:5173', 'http://127.0.0.1:5173','http://localhost:4173', 'http://127.0.0.1:4173','http://localhost:8080', 'http://127.0.0.1:8080'];
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

app.use('/posts', authenticateToken, postRouter);
app.use('/tags', authenticateToken, tagRouter);
app.use(errorHandler);


app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
});