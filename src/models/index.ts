import { QueryFilters } from '../interfaces/queries';

abstract class Model<T> {
  abstract find(filters: QueryFilters): Promise<T[] | undefined>;
  abstract findById(id: number | string): Promise<T>;
  abstract create(item: Partial<T>): Promise<T>;
  abstract update(id: number | string, item: Partial<T>): Promise<T>;
  abstract delete(id: number | string): Promise<T>;
}

export default Model;
