import { NextFunction, Request, Response } from 'express';
import { Owner } from '@prisma/client';
import { RequestWithOwner, RequestWithUser } from '@interfaces/auth.interface';
import AuthService from '@/services/ownersAuth.service';
import { CreateOwnerDto, LoginOwnerDto } from '@/dtos/owners.dto';

class AuthController {
  public authService = new AuthService();

  public signUp = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userData: CreateOwnerDto = req.body;
      const signUpUserData: Owner = await this.authService.signup(userData);

      res.status(201).json({ data: signUpUserData, message: 'signup' });
    } catch (error) {
      next(error);
    }
  };

  public logIn = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userData: LoginOwnerDto = req.body;
      const { cookie, findUser } = await this.authService.login(userData);

      res.setHeader('Set-Cookie', [cookie]);
      res.status(200).json({ data: findUser, message: 'login' });
    } catch (error) {
      next(error);
    }
  };

  public validate = async (req: RequestWithUser, res: Response) => {
    res.status(200).json({ user: req.user });
  };

  public logOut = async (req: RequestWithOwner, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userData: Owner = req.owner;
      const logOutUserData = await this.authService.logout(userData);

      res.setHeader('Set-Cookie', ['Authorization=; Max-age=0']);
      res.status(200).json({ data: logOutUserData, message: 'logout' });
    } catch (error) {
      next(error);
    }
  };
}

export default AuthController;
