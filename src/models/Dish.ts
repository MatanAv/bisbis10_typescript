import client from '../db/db';
import Model from '.';
import IDish from '../entities/Dish';
import QueryBuilder from '../services/builders/Query';
import { QueryFilters } from '../interfaces/queries';

const TABLE_NAME = 'dishes';
const qb = new QueryBuilder(TABLE_NAME);

class DishModel extends Model<IDish> {
  private static instance: DishModel;

  static getInstance(): DishModel {
    if (!DishModel.instance) {
      DishModel.instance = new DishModel();
    }
    return DishModel.instance;
  }

  async find(filters: QueryFilters = {}) {
    const res = await client.query(qb.getFindQuery(filters));
    return res.rows;
  }

  async findById(id: number | string) {
    const res = await client.query(qb.getFindByIdQuery(id));
    return res.rows[0];
  }

  async create(item: Partial<IDish>) {
    const { query, values } = qb.getCreateQuery(item);
    const res = await client.query(query, values);
    return res.rows[0];
  }

  async update(id: number | string, item: Partial<IDish>) {
    const { query, values } = qb.getUpdateQuery(id, item);
    const res = await client.query(query, values);
    return res.rows[0];
  }

  async delete(id: number | string) {
    const res = await client.query(qb.getDeleteQuery(id));
    return res.rows[0];
  }
}

const Dish = DishModel.getInstance();

export default Dish;
