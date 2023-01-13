import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import authMiddleware from '@middlewares/auth.middleware';
import validationMiddleware from '@middlewares/validation.middleware';
import { CreateItemDto, UpdateItemDto } from '@/dtos/items.dto';
import ItemsController from '@/controllers/items.controller';

class ItemsRoutes implements Routes {
  public path = '/item/';
  public router = Router();
  public itemsController = new ItemsController();
  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}create`, authMiddleware, validationMiddleware(CreateItemDto, 'body'), this.itemsController.create);
    this.router.patch(`${this.path}:id`, authMiddleware, validationMiddleware(UpdateItemDto, 'body'), this.itemsController.update);
    this.router.delete(`${this.path}:id`, authMiddleware, this.itemsController.delete);
  }
}

export default ItemsRoutes;
