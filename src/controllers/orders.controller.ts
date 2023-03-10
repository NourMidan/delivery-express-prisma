import { NextFunction, Response } from 'express';
import { Order } from '@prisma/client';
import { RequestWithOwnerWithStatus, RequestWithUser, RequestWithUserWithCartWithItems } from '@interfaces/auth.interface';
import OrdersService from '@/services/orders.service';

class OrdersController {
  public ordersService = new OrdersService();

  public create = async (req: RequestWithUserWithCartWithItems, res: Response, next: NextFunction): Promise<void> => {
    try {
      const createdOrder: Order = await this.ordersService.create(req.user);
      res.status(201).json({ data: createdOrder, message: 'created' });
    } catch (error) {
      next(error);
    }
  };
  public getUserOrders = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const orders: Order[] = await this.ordersService.getUserOrders(req.user);
      res.status(201).json({ data: orders, message: 'success' });
    } catch (error) {
      next(error);
    }
  };
  public update = async (req: RequestWithOwnerWithStatus, res: Response, next: NextFunction): Promise<void> => {
    try {
      const order: Order = await this.ordersService.update(req.owner, Number(req.params.id), req.body.status);
      res.status(201).json({ data: order, message: 'success' });
    } catch (error) {
      next(error);
    }
  };
}

export default OrdersController;
