import { Router } from 'express';

const restaurantsRouter = Router();

restaurantsRouter.get('/', (req, res) => {
  res.send('Hello from restaurants');
});

export default restaurantsRouter;
