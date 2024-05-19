import { Router } from 'express';
import { createOrder } from '../controllers/orders';

const ordersRouter = Router();

ordersRouter.post('/', async (req, res) => {
  const { restaurantId, orderItems } = req.body;

  const response = await createOrder(restaurantId, orderItems);

  res.status(response.status).json(response);
});

export default ordersRouter;
