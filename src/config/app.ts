import express, { Application } from 'express';
import cors from 'cors';
import useRoutes from '../middlewares/routes';

const app: Application = express();

app.use(cors({ origin: '*', credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

useRoutes(app);

export default app;
