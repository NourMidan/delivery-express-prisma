import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import MenusController from '@/controllers/menus.controller';

class MenusRoutes implements Routes {
  public path = '/menu/';
  public router = Router();
  public menusController = new MenusController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}list`, this.menusController.list);
    this.router.get(`${this.path}:id`, this.menusController.getMenuById);
  }
}

export default MenusRoutes;
