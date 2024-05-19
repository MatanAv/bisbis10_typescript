import { StatusCodes } from 'http-status-codes';
import { ResponseFormat } from '../types/api';
import { QueryFilters } from '../interfaces/queries';

const getErrorResponse = (error: any, code?: number, message?: string): ResponseFormat => {
  console.error(error);
  return {
    status: code || StatusCodes.INTERNAL_SERVER_ERROR,
    message: message || 'Internal server error'
  };
};

const getBasicQueryFilters = (filters: Record<string, any> = {}): QueryFilters => {
  const queryFilters: QueryFilters = {};

  Object.keys(filters).forEach((key) => (queryFilters[key] = { value: filters[key] }));

  return queryFilters;
};

export { getErrorResponse, getBasicQueryFilters };
