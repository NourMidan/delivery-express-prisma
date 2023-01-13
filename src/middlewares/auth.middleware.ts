import { NextFunction, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { Owner, PrismaClient, User } from '@prisma/client';
import { SECRET_KEY } from '@config';
import { HttpException } from '@exceptions/HttpException';
import { DataStoredInToken, RequestWithUser } from '@interfaces/auth.interface';

const authMiddleware = async (req: RequestWithUser, res: Response, next: NextFunction) => {
  try {
    const Authorization = req.cookies['Authorization'] || (req.header('Authorization') ? req.header('Authorization').split('Bearer ')[1] : null);
    if (Authorization) {
      const secretKey: string = SECRET_KEY;
      const verificationResponse = (await verify(Authorization, secretKey)) as DataStoredInToken;
      const userId = verificationResponse.id;
      const type = verificationResponse.type;

      let findUser: User | Owner;
      if (type === 'owner') {
        const owners = new PrismaClient().owner;
        findUser = await owners.findUnique({ where: { id: userId } });
      } else {
        const users = new PrismaClient().user;
        findUser = await users.findUnique({ where: { id: userId }, include: { cart: { include: { items: { select: { item: true } } } } } });
      }

      if (findUser) {
        req[type] = findUser;
        next();
      } else {
        next(new HttpException(401, 'Wrong authentication token'));
      }
    } else {
      next(new HttpException(404, 'Authentication token missing'));
    }
  } catch (error) {
    next(new HttpException(401, 'Wrong authentication token'));
  }
};

export default authMiddleware;
