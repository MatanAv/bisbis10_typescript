import { Router } from 'express';
import { createRating } from '../controllers/ratings';

const ratingsRouter = Router();

ratingsRouter.post('/', async (req, res) => {
  const response = await createRating(req.body);

  res.status(response.status).json(response);
});

export default ratingsRouter;
