import client from '../db/db';
import Model from '.';
import IOrderItem from '../entities/OrderItem';
import QueryBuilder from '../services/builders/Query';
import { QueryFilters } from '../interfaces/queries';

const TABLE_NAME = 'order_items';
const qb = new QueryBuilder(TABLE_NAME);

class OrderItemModel extends Model<IOrderItem> {
  private static instance: OrderItemModel;

  static getInstance(): OrderItemModel {
    if (!OrderItemModel.instance) {
      OrderItemModel.instance = new OrderItemModel();
    }
    return OrderItemModel.instance;
  }

  async find(filters: QueryFilters = {}) {
    const res = await client.query(qb.getFindQuery(filters));
    return res.rows;
  }

  async findById(id: number | string) {
    const res = await client.query(qb.getFindByIdQuery(id));
    return res.rows[0];
  }

  async create(item: Partial<IOrderItem>) {
    const { query, values } = qb.getCreateQuery(item);
    const res = await client.query(query, values);
    return res.rows[0];
  }

  async createMany(items: IOrderItem[]) {
    const { query, values } = qb.getCreateManyQuery(items);
    const res = await client.query(query, values);
    return res.rows;
  }

  async update(id: number | string, item: Partial<IOrderItem>) {
    const { query, values } = qb.getUpdateQuery(id, item);
    const res = await client.query(query, values);
    return res.rows[0];
  }

  async delete(id: number | string) {
    const res = await client.query(qb.getDeleteQuery(id));
    return res.rows[0];
  }
}

const OrderItem = OrderItemModel.getInstance();

export default OrderItem;
