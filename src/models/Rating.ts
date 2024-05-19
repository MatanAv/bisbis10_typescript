import client from '../db/db';
import Model from '.';
import IRating from '../entities/Rating';
import QueryBuilder from '../services/builders/Query';
import { QueryFilters } from '../interfaces/queries';

const TABLE_NAME = 'ratings';
const qb = new QueryBuilder(TABLE_NAME);

class RatingModel extends Model<IRating> {
  private static instance: RatingModel;

  static getInstance(): RatingModel {
    if (!RatingModel.instance) {
      RatingModel.instance = new RatingModel();
    }
    return RatingModel.instance;
  }

  async find(filters: QueryFilters = {}) {
    const res = await client.query(qb.getFindQuery(filters));
    return res.rows;
  }

  async findById(id: number | string) {
    const res = await client.query(qb.getFindByIdQuery(id));
    return res.rows[0];
  }

  async create(item: Partial<IRating>) {
    const { query, values } = qb.getCreateQuery(item);
    const res = await client.query(query, values);
    return res.rows[0];
  }

  async update(id: number | string, item: Partial<IRating>) {
    const { query, values } = qb.getUpdateQuery(id, item);
    const res = await client.query(query, values);
    return res.rows[0];
  }

  async delete(id: number | string) {
    const res = await client.query(qb.getDeleteQuery(id));
    return res.rows[0];
  }
}

const Rating = RatingModel.getInstance();

export default Rating;
