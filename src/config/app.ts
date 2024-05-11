import express, { Application } from 'express';
import useRoutes from '../middlewares/routes';

const app: Application = express();

useRoutes(app);

export default app;
