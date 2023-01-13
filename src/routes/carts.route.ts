import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import authMiddleware from '@middlewares/auth.middleware';
import validationMiddleware from '@middlewares/validation.middleware';
import { CreateItemDto, UpdateItemDto } from '@/dtos/items.dto';
import CartsController from '@/controllers/carts.controller';

class CartsRoutes implements Routes {
  public path = '/cart/';
  public router = Router();
  public cartsController = new CartsController();
  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, authMiddleware, this.cartsController.getUserCart);
    this.router.patch(`${this.path}add`, authMiddleware, this.cartsController.addToCart);
    this.router.patch(`${this.path}remove`, authMiddleware, this.cartsController.removeFromCart);
    this.router.post(`${this.path}clear`, authMiddleware, this.cartsController.clear);
  }
}

export default CartsRoutes;
