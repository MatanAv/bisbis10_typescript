import { StatusCodes } from 'http-status-codes';
import { ResponseFormat } from '../types/api';
import { getErrorResponse } from '../utils/api';
import Order from '../models/Order';
import OrderItem from '../models/OrderItem';
import IOrderItem from '../entities/OrderItem';

const createOrder = async (restaurantId: number, orderItems: Partial<IOrderItem>[]): Promise<ResponseFormat> => {
  try {
    const newOrder = await Order.create({ restaurantId });
    const items = orderItems.map((item) => ({ ...item, orderId: newOrder.id }));

    await OrderItem.createMany(items as IOrderItem[]); // Should have been validated before reaching this point

    return { status: StatusCodes.OK, data: { orderId: newOrder.id } };
  } catch (error) {
    return getErrorResponse(error);
  }
};

export { createOrder };
