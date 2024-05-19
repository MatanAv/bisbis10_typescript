import client from '../db/db';
import Model from '.';
import IRestaurant from '../entities/Restaurant';
import QueryBuilder from '../services/builders/Query';
import { QueryFilters } from '../interfaces/queries';

const TABLE_NAME = 'restaurants';
const qb = new QueryBuilder(TABLE_NAME);

class RestaurantModel extends Model<IRestaurant> {
  private static instance: RestaurantModel;

  static getInstance(): RestaurantModel {
    if (!RestaurantModel.instance) {
      RestaurantModel.instance = new RestaurantModel();
    }
    return RestaurantModel.instance;
  }

  async find(filters: QueryFilters = {}) {
    const res = await client.query(qb.getFindQuery(filters));
    return res.rows;
  }

  async findById(id: number | string) {
    const res = await client.query(qb.getFindByIdQuery(id));
    return res.rows[0];
  }

  async findWithDishes(id: number | string) {
    const query = `
      SELECT r.*, json_agg(json_build_object(
        'id', d.id, 
        'name', d.name, 
        'description', d.description, 
        'price', d.price
      )) as dishes 
      FROM restaurants r
      JOIN dishes d ON r.id = d.restaurant_id
      WHERE r.id = $1
      GROUP BY r.id
    `;
    const res = await client.query(query, [id]);
    return res.rows[0];
  }

  async create(item: Partial<IRestaurant>) {
    const { query, values } = qb.getCreateQuery(item);
    const res = await client.query(query, values);
    return res.rows[0];
  }

  async update(id: number | string, item: Partial<IRestaurant>) {
    const { query, values } = qb.getUpdateQuery(id, item);
    const res = await client.query(query, values);
    return res.rows[0];
  }

  async delete(id: number | string) {
    const res = await client.query(qb.getDeleteQuery(id));
    return res.rows[0];
  }
}

const Restaurant = RestaurantModel.getInstance();

export default Restaurant;
