import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import authMiddleware from '@middlewares/auth.middleware';
import OrdersController from '@/controllers/orders.controller';

class OrdersRoutes implements Routes {
  public path = '/order/';
  public router = Router();
  public ordersController = new OrdersController();
  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}create`, authMiddleware, this.ordersController.create);
    this.router.get(`${this.path}list`, authMiddleware, this.ordersController.getUserOrders);
    this.router.patch(`${this.path}:id`, authMiddleware, this.ordersController.update);
  }
}

export default OrdersRoutes;
