import { Status } from '@/interfaces/models.interface';
import { IsNotEmpty, IsEnum } from 'class-validator';
import { Item, Menu } from '@prisma/client';

export class CreateOrderDto {
  @IsNotEmpty()
  items: Item[];

  @IsNotEmpty()
  menu: Menu;
}

export class UpdateOrderDto {
  @IsEnum(Status)
  status: Status;
}
