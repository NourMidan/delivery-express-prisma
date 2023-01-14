import { compare, hash } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { Categories, Menu, Owner, PrismaClient } from '@prisma/client';
import { SECRET_KEY } from '@config';
import { HttpException } from '@exceptions/HttpException';
import { DataStoredInToken, OwnerWithType, TokenData } from '@interfaces/auth.interface';
import { isEmpty } from '@utils/util';
import { CreateOwnerDto, LoginOwnerDto } from '@/dtos/owners.dto';

class OwnersAuthService {
  public owners = new PrismaClient().owner;
  public menus = new PrismaClient().menu;

  public async signup(userData: CreateOwnerDto): Promise<Owner> {
    const { name, email, password, menuName, category } = userData;
    if (isEmpty(userData)) throw new HttpException(400, 'userData is empty');
    function isCategories(value: string): value is Categories {
      return Object.values<string>(Categories).includes(value);
    }

    category.forEach(item => {
      if (!isCategories(item)) {
        throw new HttpException(409, 'unvalid categories');
      }
    });
    const findUser: Owner = await this.owners.findUnique({ where: { email: email } });
    const findMenu: Menu = await this.menus.findUnique({ where: { name: menuName } });
    if (findUser) throw new HttpException(409, `This email ${email} already exists`);
    if (findMenu) throw new HttpException(409, `This Menu ${menuName} already exists`);

    const createdMenu = await this.menus.create({ data: { category, name: menuName } });

    const hashedPassword = await hash(password, 10);
    const createUserData: Promise<Owner> = this.owners.create({ data: { name, email, menuId: createdMenu.id, password: hashedPassword } });

    return createUserData;
  }

  public async login(userData: LoginOwnerDto): Promise<{ cookie: string; findUser: Owner }> {
    if (isEmpty(userData)) throw new HttpException(400, 'userData is empty');

    const findUser: Owner = await this.owners.findUnique({ where: { email: userData.email } });
    if (!findUser) throw new HttpException(409, `This email ${userData.email} was not found`);

    const isPasswordMatching: boolean = await compare(userData.password, findUser.password);
    if (!isPasswordMatching) throw new HttpException(409, 'Password is not matching');

    const tokenData = this.createToken({ ...findUser, type: 'owner' });
    const cookie = this.createCookie(tokenData);

    return { cookie, findUser };
  }

  public async logout(userData: Owner): Promise<Owner> {
    if (isEmpty(userData)) throw new HttpException(400, 'userData is empty');

    const findUser: Owner = await this.owners.findFirst({ where: { email: userData.email, password: userData.password } });
    if (!findUser) throw new HttpException(409, "User doesn't exist");

    return findUser;
  }

  public createToken(user: OwnerWithType): TokenData {
    const dataStoredInToken: DataStoredInToken = { id: user.id, type: user.type };
    const secretKey: string = SECRET_KEY;
    const expiresIn: number = 60 * 60;

    return { expiresIn, token: sign(dataStoredInToken, secretKey, { expiresIn }) };
  }

  public createCookie(tokenData: TokenData): string {
    return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn};`;
  }
}

export default OwnersAuthService;
