import client from '../db/db';
import Model from '.';
import IOrder from '../entities/Order';
import QueryBuilder from '../services/builders/Query';
import { QueryFilters } from '../interfaces/queries';
import { v4 as uuidv4 } from 'uuid';

const TABLE_NAME = 'orders';
const qb = new QueryBuilder(TABLE_NAME);

class OrderModel extends Model<IOrder> {
  private static instance: OrderModel;

  static getInstance(): OrderModel {
    if (!OrderModel.instance) {
      OrderModel.instance = new OrderModel();
    }
    return OrderModel.instance;
  }

  async find(filters: QueryFilters = {}) {
    const res = await client.query(qb.getFindQuery(filters));
    return res.rows;
  }

  async findById(id: number | string) {
    const res = await client.query(qb.getFindByIdQuery(id));
    return res.rows[0];
  }

  async create(item: Partial<IOrder>) {
    item.id = uuidv4();
    const { query, values } = qb.getCreateQuery(item);
    const res = await client.query(query, values);
    return res.rows[0];
  }

  async update(id: number | string, item: Partial<IOrder>) {
    const { query, values } = qb.getUpdateQuery(id, item);
    const res = await client.query(query, values);
    return res.rows[0];
  }

  async delete(id: number | string) {
    const res = await client.query(qb.getDeleteQuery(id));
    return res.rows[0];
  }
}

const Order = OrderModel.getInstance();

export default Order;
