import { Router } from 'express';
import AuthController from '@/controllers/usersAuth.controller';
import { CreateUserDto, LoginUserDto } from '@dtos/users.dto';
import { Routes } from '@interfaces/routes.interface';
import authMiddleware from '@middlewares/auth.middleware';
import validationMiddleware from '@middlewares/validation.middleware';

class UsersAuthRoute implements Routes {
  public path = '/users/';
  public router = Router();
  public authController = new AuthController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}signup`, validationMiddleware(CreateUserDto, 'body'), this.authController.signUp);
    this.router.post(`${this.path}signin`, validationMiddleware(LoginUserDto, 'body'), this.authController.logIn);
    this.router.post(`${this.path}validate`, authMiddleware, this.authController.validate);
    this.router.post(`${this.path}logout`, authMiddleware, this.authController.logOut);
  }
}

export default UsersAuthRoute;
