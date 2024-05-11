import { Router } from 'express';

const ordersRouter = Router();

ordersRouter.get('/', (req, res) => {
  res.send('Hello from orders');
});

export default ordersRouter;
