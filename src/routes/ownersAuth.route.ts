import { Router } from 'express';
import AuthController from '@/controllers/ownersAuth.controller';
import { Routes } from '@interfaces/routes.interface';
import authMiddleware from '@middlewares/auth.middleware';
import validationMiddleware from '@middlewares/validation.middleware';
import { CreateOwnerDto, LoginOwnerDto } from '@/dtos/owners.dto';

class OwnersAuthRoute implements Routes {
  public path = '/owners/';
  public router = Router();
  public authController = new AuthController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}signup`, validationMiddleware(CreateOwnerDto, 'body'), this.authController.signUp);
    this.router.post(`${this.path}signin`, validationMiddleware(LoginOwnerDto, 'body'), this.authController.logIn);
    this.router.post(`${this.path}validate`, authMiddleware, this.authController.validate);
    this.router.post(`${this.path}logout`, authMiddleware, this.authController.logOut);
  }
}

export default OwnersAuthRoute;
