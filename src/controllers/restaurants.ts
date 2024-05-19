import { StatusCodes } from 'http-status-codes';
import { Operators } from '../enums/queries';
import { QueryFilters } from '../interfaces/queries';
import { ResponseFormat } from '../types/api';
import { getBasicQueryFilters, getErrorResponse } from '../utils/api';
import Restaurant from '../models/Restaurant';
import IRestaurant from '../entities/Restaurant';

// That is not ideal, a better solution can be to get the requested filters with operators from client
const buildRestaurantFilters = (filters: Record<string, any> = {}): QueryFilters => {
  const queryFilters = getBasicQueryFilters(filters);

  if (queryFilters.cuisine) {
    queryFilters.cuisines = { value: queryFilters.cuisine.value.split(','), operator: Operators.CONTAINS }; // Support multiple cuisines with comma separated values
    delete queryFilters.cuisine; // Again, not ideal, I would avoid this with query 'cuisines' instead of 'cuisine' and support multiple cuisines
  }

  return queryFilters;
};

const getRestaurants = async (filters = {}): Promise<ResponseFormat> => {
  try {
    const queryFilters = buildRestaurantFilters(filters);
    const restaurants = await Restaurant.find(queryFilters);
    return { status: StatusCodes.OK, data: restaurants };
  } catch (error) {
    return getErrorResponse(error);
  }
};

const getRestaurant = async (id: number | string): Promise<ResponseFormat> => {
  try {
    const restaurant = await Restaurant.findById(id);
    return { status: StatusCodes.OK, data: restaurant };
  } catch (error) {
    return getErrorResponse(error);
  }
};

const getRestaurantWithDishes = async (id: number | string): Promise<ResponseFormat> => {
  try {
    const restaurant = await Restaurant.findWithDishes(id);
    return { status: StatusCodes.OK, data: restaurant };
  } catch (error) {
    return getErrorResponse(error);
  }
};

const createRestaurant = async (restaurant: Partial<IRestaurant>): Promise<ResponseFormat> => {
  try {
    await Restaurant.create(restaurant);
    return { status: StatusCodes.CREATED };
  } catch (error) {
    return getErrorResponse(error);
  }
};

const updateRestaurant = async (id: number | string, restaurant: Partial<IRestaurant>): Promise<ResponseFormat> => {
  try {
    await Restaurant.update(id, restaurant);
    return { status: StatusCodes.OK };
  } catch (error) {
    return getErrorResponse(error);
  }
};

const deleteRestaurant = async (id: number | string): Promise<ResponseFormat> => {
  try {
    await Restaurant.delete(id);
    return { status: StatusCodes.NO_CONTENT };
  } catch (error) {
    return getErrorResponse(error);
  }
};

export { getRestaurants, getRestaurant, getRestaurantWithDishes, createRestaurant, updateRestaurant, deleteRestaurant };
