import { Router } from 'express';
import { getDishesByRestaurant, createDish, updateDish, deleteDish } from '../controllers/dishes';
import {
  getRestaurants,
  getRestaurantWithDishes,
  createRestaurant,
  updateRestaurant,
  deleteRestaurant
} from '../controllers/restaurants';

const restaurantsRouter = Router();

restaurantsRouter.get('/', async (req, res) => {
  const response = await getRestaurants(req.query);

  res.status(response.status).json(response);
});

restaurantsRouter.get('/:id', async (req, res) => {
  const response = await getRestaurantWithDishes(req.params.id);

  res.status(response.status).json(response);
});

restaurantsRouter.get('/:id/dishes', async (req, res) => {
  const response = await getDishesByRestaurant(req.params.id);

  res.status(response.status).json(response);
});

restaurantsRouter.post('/', async (req, res) => {
  const response = await createRestaurant(req.body);

  res.status(response.status).json(response);
});

restaurantsRouter.post('/:id/dishes', async (req, res) => {
  const dish = { ...req.body, restaurantId: req.params.id };

  const response = await createDish(dish);

  res.status(response.status).json(response);
});

restaurantsRouter.put('/:id', async (req, res) => {
  const response = await updateRestaurant(req.params.id, req.body);

  res.status(response.status).json(response);
});

restaurantsRouter.put('/:id/dishes/:dishId', async (req, res) => {
  const { id, dishId } = req.params;

  const response = await updateDish(dishId, req.body);

  res.status(response.status).json(response);
});

restaurantsRouter.delete('/:id', async (req, res) => {
  const { id } = req.params;

  const response = await deleteRestaurant(id);

  res.status(response.status).json(response);
});

restaurantsRouter.delete('/:id/dishes/:dishId', async (req, res) => {
  const { dishId } = req.params; // Based on the way I structured the dishes table, I don't need the restaurant id here

  const response = await deleteDish(dishId);

  res.status(response.status).json(response);
});

export default restaurantsRouter;
