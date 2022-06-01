import { Request, Response } from 'express';
import { userService, mailerService } from '../services';

class UserController {
  loginUser = async (req: Request, res: Response) => {
    const { status, message } = await userService.loginUser(req);
    return res.status(status).json(message);
  };

  createUser = async (req: Request, res: Response) => {
    const user = await userService.createUser(req);
    mailerService.welcomeEmail(user.email);
    return res.status(201).json(user);
  };
}

export default new UserController();
