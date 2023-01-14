import { Cart, Order, Owner, PrismaClient, Status, User } from '@prisma/client';
import { HttpException } from '@exceptions/HttpException';
import { UserWithCart, UserWithCartWithItems } from '@interfaces/auth.interface';

class OrdersService {
  public carts = new PrismaClient().cart;
  public itemsOnOrder = new PrismaClient().itemsOnOrder;
  public itemsOnCart = new PrismaClient().itemsOnCart;
  public orders = new PrismaClient().order;

  public async create(user: UserWithCartWithItems): Promise<Order> {
    const { items } = user.cart;
    if (items.length === 0) throw new HttpException(404, 'empty cart');
    const createdOrder = await this.orders.create({
      data: { userId: user.id, menuId: user.cart.menuId },
    });
    const data = items.map(item => {
      return { itemId: item['item'].id, orderId: createdOrder.id, assignedBy: user.email };
    });

    const createdItemsOnOrder = await this.itemsOnOrder.createMany({ data });

    if (createdItemsOnOrder) {
      this.clear(user);
    }
    return createdOrder;
  }
  public async getUserOrders(user: User): Promise<Order[]> {
    const orders = await this.orders.findMany({ where: { userId: user.id }, include: { items: { include: { item: true } } } });
    return orders;
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
  public async update(owner: Owner, id: number, status: Status): Promise<Order> {
    const order = await this.orders.findUnique({ where: { id } });
    function isStatus(value: string): value is Status {
      return Object.values<string>(Status).includes(value);
    }

    if (!isStatus(status)) throw new HttpException(409, 'invalid category');
    if (!order) throw new HttpException(404, 'order doesnt exist');
    if (order.menuId !== owner.menuId) {
      throw new HttpException(401, 'unauthorized');
    } else {
      return await this.orders.update({
        where: { id },
        data: { status },
      });
    }
  }
}

export default OrdersService;
