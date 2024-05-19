import { StatusCodes } from 'http-status-codes';
import { ResponseFormat } from '../types/api';
import { getBasicQueryFilters, getErrorResponse } from '../utils/api';
import Dish from '../models/Dish';
import IDish from '../entities/Dish';

const getDishesByRestaurant = async (restaurantId: string): Promise<ResponseFormat> => {
  try {
    const filters = getBasicQueryFilters({ restaurantId });
    const dishes = await Dish.find(filters);
    return { status: StatusCodes.OK, data: dishes };
  } catch (error) {
    return getErrorResponse(error);
  }
};

const createDish = async (dish: Partial<IDish>): Promise<ResponseFormat> => {
  try {
    await Dish.create(dish);
    return { status: StatusCodes.CREATED };
  } catch (error) {
    return getErrorResponse(error);
  }
};

const updateDish = async (id: number | string, dish: Partial<IDish>): Promise<ResponseFormat> => {
  try {
    await Dish.update(id, dish);
    return { status: StatusCodes.OK };
  } catch (error) {
    return getErrorResponse(error);
  }
};

const deleteDish = async (id: number | string): Promise<ResponseFormat> => {
  try {
    await Dish.delete(id);
    return { status: StatusCodes.NO_CONTENT };
  } catch (error) {
    return getErrorResponse(error);
  }
};

export { getDishesByRestaurant, createDish, updateDish, deleteDish };
