import { Categories } from '@prisma/client';

export class FilterMenuDto {
  search?: string;
  category?: Categories;
}
