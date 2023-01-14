import { NextFunction, Request, Response } from 'express';
import { Menu } from '@prisma/client';
import MenusService from '@/services/menus.service';

class MenusController {
  public menusService = new MenusService();

  public list = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const menus: { data: Menu[]; count: number } = await this.menusService.list(req.query);
      res.status(201).json({ data: menus.data, count: menus.count, message: 'success' });
    } catch (error) {
      next(error);
    }
  };
  public getMenuById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const menu: Menu = await this.menusService.getMenuById(req.params.id);
      res.status(201).json({ data: menu, message: 'success' });
    } catch (error) {
      next(error);
    }
  };
}

export default MenusController;
