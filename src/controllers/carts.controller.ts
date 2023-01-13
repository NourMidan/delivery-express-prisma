import { NextFunction, Request, Response } from 'express';
import { Cart, Item, Owner, User } from '@prisma/client';
import { RequestWithOwner, RequestWithUser, RequestWithUserWithCart, RequestWithUserWithCartWithItems } from '@interfaces/auth.interface';
import ItemsService from '@/services/items.service';
import { CreateItemDto } from '@/dtos/items.dto';
import CartsService from '@/services/carts.service';

class CartsController {
  public cartsService = new CartsService();

  public getUserCart = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    const { user } = req;
    try {
      const cart: Cart = await this.cartsService.getUserCart(user);
      res.status(201).json({ data: cart, message: 'success' });
    } catch (error) {
      next(error);
    }
  };
  public addToCart = async (req: RequestWithUserWithCartWithItems, res: Response, next: NextFunction): Promise<void> => {
    const { user } = req;
    const { item } = req.body;

    try {
      const cart: Cart = await this.cartsService.addToCart(user, Number(item));
      res.status(201).json({ data: cart, message: 'added' });
    } catch (error) {
      next(error);
    }
  };
  public removeFromCart = async (req: RequestWithUserWithCartWithItems, res: Response, next: NextFunction): Promise<void> => {
    const { user } = req;
    const { item } = req.body;

    try {
      await this.cartsService.removeFromCart(user, Number(item));
      res.status(201).json({ message: 'removed' });
    } catch (error) {
      next(error);
    }
  };
  public clear = async (req: RequestWithUserWithCart, res: Response, next: NextFunction): Promise<void> => {
    const { user } = req;

    try {
      await this.cartsService.clear(user);
      res.status(201).json({ message: 'cleared' });
    } catch (error) {
      next(error);
    }
  };
}

export default CartsController;
