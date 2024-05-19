import { Operators } from '../enums/queries';

export interface QueryFilters {
  [key: string]: {
    operator?: Operators;
    value: any;
  };
}
