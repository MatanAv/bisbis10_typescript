import { Router } from 'express';

const ratingsRouter = Router();

ratingsRouter.get('/', (req, res) => {
  res.send('Hello from ratings');
});

export default ratingsRouter;
