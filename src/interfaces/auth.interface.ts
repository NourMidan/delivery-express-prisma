import { Request } from 'express';
import { Cart, Item, Menu, Owner, Status, User } from '@prisma/client';

export interface DataStoredInToken {
  id: string;
  type: string;
}

export interface TokenData {
  token: string;
  expiresIn: number;
}

export interface RequestWithUser extends Request {
  user: User;
}
export interface RequestWithUserWithCart extends Request {
  user: UserWithCart;
}
export interface RequestWithUserWithCartWithItems extends Request {
  user: UserWithCartWithItems;
}

export interface RequestWithOwner extends Request {
  owner: Owner;
}
export interface RequestWithOwnerWithStatus extends RequestWithOwner {
  status: Status;
}
export interface OwnerWithType extends Owner {
  type: string;
}
export interface UserWithType extends User {
  type: string;
}
export interface UserWithCart extends User {
  cart: Cart;
}
export interface UserWithCartWithItems extends UserWithCart {
  cart: CartWithItems;
}

export interface CartWithItems extends Cart {
  items: Item[];
}
export interface ItemWithMenu extends Item {
  Menu: Menu;
}
