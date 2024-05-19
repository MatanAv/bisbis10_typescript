import { StatusCodes } from 'http-status-codes';
import { ResponseFormat } from '../types/api';
import { getErrorResponse } from '../utils/api';
import Rating from '../models/Rating';
import IRating from '../entities/Rating';

const createRating = async (rating: Partial<IRating>): Promise<ResponseFormat> => {
  try {
    await Rating.create(rating);
    return { status: StatusCodes.OK };
  } catch (error) {
    return getErrorResponse(error);
  }
};

export { createRating };
