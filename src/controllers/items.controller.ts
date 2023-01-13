import { NextFunction, Request, Response } from 'express';
import { Item, Owner, User } from '@prisma/client';
import { RequestWithOwner, RequestWithUser } from '@interfaces/auth.interface';
import ItemsService from '@/services/items.service';
import { CreateItemDto } from '@/dtos/items.dto';

class ItemsController {
  public itemsService = new ItemsService();

  public create = async (req: RequestWithOwner, res: Response, next: NextFunction): Promise<void> => {
    try {
      const itemData: CreateItemDto = req.body;
      const owner: Owner = req.owner;
      const createdItem: Item = await this.itemsService.create(itemData, owner);
      res.status(201).json({ data: createdItem, message: 'created' });
    } catch (error) {
      next(error);
    }
  };
  public update = async (req: RequestWithOwner, res: Response, next: NextFunction): Promise<void> => {
    try {
      const itemData: CreateItemDto = req.body;
      const owner: Owner = req.owner;
      const { id } = req.params;
      const createdItem: Item = await this.itemsService.update(itemData, owner, Number(id));
      res.status(201).json({ data: createdItem, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };
  public delete = async (req: RequestWithOwner, res: Response, next: NextFunction): Promise<void> => {
    try {
      const owner: Owner = req.owner;
      const { id } = req.params;
      await this.itemsService.delete(owner, Number(id));
      res.status(201).json({ message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default ItemsController;
