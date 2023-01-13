import { compare, hash } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { Cart, Categories, Item, Menu, Owner, PrismaClient, User } from '@prisma/client';
import { SECRET_KEY } from '@config';
import { CreateUserDto, LoginUserDto } from '@dtos/users.dto';
import { HttpException } from '@exceptions/HttpException';
import {
  CartWithItems,
  DataStoredInToken,
  ItemWithMenu,
  OwnerWithType,
  RequestWithUser,
  RequestWithUserWithCartWithItems,
  TokenData,
  UserWithCart,
  UserWithCartWithItems,
} from '@interfaces/auth.interface';
import { isEmpty } from '@utils/util';
import { CreateOwnerDto, LoginOwnerDto } from '@/dtos/owners.dto';
import { CreateItemDto, UpdateItemDto } from '@/dtos/items.dto';

class CartsService {
  public owners = new PrismaClient().owner;
  public items = new PrismaClient().item;
  public carts = new PrismaClient().cart;
  public itemsOnCart = new PrismaClient().itemsOnCart;
  public async getUserCart(user: User): Promise<Cart> {
    const { cartId } = user;
    const findCart: Cart = await this.carts.findUnique({ where: { id: cartId }, include: { items: true } });
    if (!findCart) throw new HttpException(409, `This cart does not exists`);
    return findCart;
  }
  public async addToCart(user: UserWithCartWithItems, item: number): Promise<Cart> {
    const { cart } = user;
    console.log(user);
    const findItem: ItemWithMenu = await this.items.findUnique({ where: { id: item }, include: { Menu: true } });
    if (!findItem) throw new HttpException(409, `This item does not exists`);
    const checker = await this.itemsOnCart.findMany({
      where: { cartId: cart.id, itemId: findItem.id },
    });

    if (checker.length > 0) throw new HttpException(409, `already in cart`);

    console.log(findItem);
    if (cart.items.length === 0 || findItem.Menu.id === cart.menuId) {
      const updatedCart = this.carts.update({
        where: { id: cart.id },
        data: { menuId: findItem.menuId, items: { create: [{ assignedBy: user.email, item: { connect: { id: findItem.id } } }] } },
        include: {
          items: { select: { item: true } },
        },
      });
      return updatedCart;
    } else {
      await this.clear(user);
      const updatedCart = this.carts.update({
        where: { id: cart.id },
        data: { menuId: findItem.menuId, items: { create: [{ assignedBy: user.email, item: { connect: { id: findItem.id } } }] } },
        include: {
          items: true,
        },
      });
      return updatedCart;
    }
    // const updatedCart = await this.items.carts({ where: { id } });
    return null;
  }
  public async removeFromCart(user: UserWithCartWithItems, item: number): Promise<void> {
    const { cart } = user;
    const findItem: Item = await this.items.findUnique({ where: { id: item } });
    if (!findItem) throw new HttpException(409, `This item does not exists`);

    if (cart.items.length === 1) {
      await this.clear(user);
    } else {
      await this.itemsOnCart.deleteMany({
        where: { cartId: cart.id, itemId: findItem.id },
      });
    }
    return null;
  }
  public async clear(user: UserWithCart): Promise<Cart> {
    const { id } = user.cart;

    await this.itemsOnCart.deleteMany({
      where: { cartId: id },
    });
    const updatedCart = this.carts.update({
      where: { id },
      data: { menuId: null },
      include: {
        items: true,
      },
    });
    return updatedCart;
  }
}

export default CartsService;
