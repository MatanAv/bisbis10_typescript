import { Application } from 'express';
import restaurantsRouter from '../routes/restaurants';
import ratingsRouter from '../routes/ratings';
import ordersRouter from '../routes/orders';

const useRoutes = (app: Application) => {
  app.use('/api/restaurants', restaurantsRouter);
  app.use('/api/ratings', ratingsRouter);
  app.use('/api/order', ordersRouter);
};

export default useRoutes;
