import { Categories, Menu, Prisma, PrismaClient } from '@prisma/client';
import { HttpException } from '@exceptions/HttpException';

class MenusService {
  public menus = new PrismaClient().menu;

  public async list(query): Promise<{ data: Menu[]; count: number }> {
    const { search, category, limit, page } = query;

    function isCategories(value: string): value is Categories {
      return Object.values<string>(Categories).includes(value);
    }

    const currentPage = Math.max(Number(page || 1), 1);

    const options: Prisma.MenuFindManyArgs = {
      take: Number(limit) || 4,
      skip: (currentPage - 1) * limit,
    };
    const countOptions: any = {};
    if (category.length > 0) {
      if (!isCategories(category)) {
        throw new HttpException(409, 'unvalid category');
      }
      options.where = {
        name: { contains: search, mode: 'insensitive' },
        category: { has: category },
      };
      countOptions.where = options.where;
    } else {
      options.where = {
        name: { contains: search, mode: 'insensitive' },
      };
      countOptions.where = options.where;
    }

    const [filteredMenus, count] = await Promise.all([this.menus.findMany(options), this.menus.count(countOptions)]);

    return { data: filteredMenus, count };
  }
  public async getMenuById(id: string): Promise<Menu> {
    const findMenu = await this.menus.findUnique({ where: { id }, include: { items: true } });
    if (!findMenu) throw new HttpException(404, 'Not Found');
    return findMenu;
  }
}

export default MenusService;
