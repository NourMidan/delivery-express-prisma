import { Item, Owner, PrismaClient } from '@prisma/client';
import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';
import { CreateItemDto, UpdateItemDto } from '@/dtos/items.dto';

class ItemsService {
  public items = new PrismaClient().item;

  public async create(itemData: CreateItemDto, owner: Owner): Promise<Item> {
    const { name, description } = itemData;
    const { menuId } = owner;
    const createdItem = await this.items.create({ data: { name, description, menuId } });
    if (isEmpty(itemData)) throw new HttpException(400, 'itemData is empty');

    return createdItem;
  }
  public async update(itemData: UpdateItemDto, owner: Owner, id: number): Promise<Item> {
    const { name, description } = itemData;
    const { menuId } = owner;
    if (isEmpty(itemData)) throw new HttpException(400, 'itemData is empty');
    const findItem: Item = await this.items.findUnique({ where: { id } });
    if (!findItem) throw new HttpException(409, `This item does not exists`);

    if (menuId === findItem.menuId) {
      const updatedItem = await this.items.update({ where: { id }, data: { name, description, menuId } });
      return updatedItem;
    } else {
      throw new HttpException(401, `unauthorized`);
    }
  }
  public async delete(owner: Owner, id: number): Promise<string> {
    const { menuId } = owner;
    const findItem: Item = await this.items.findUnique({ where: { id } });
    if (!findItem) throw new HttpException(409, `This item does not exists`);

    if (menuId === findItem.menuId) {
      await this.items.delete({ where: { id } });
      return null;
    } else {
      throw new HttpException(401, `unauthorized`);
    }
  }
}

export default ItemsService;
