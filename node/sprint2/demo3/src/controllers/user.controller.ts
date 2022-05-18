import { userService } from "../services";
import { Request, Response } from "express";

class UserController {
  insertUserController = async (req: Request, res: Response) => {
    const newUser = await userService.insertUserService(req);

    return res.status(201).json(newUser);
  };

  loginController = async (req: Request, res: Response) => {
    const { status, message } = await userService.loginService(req);
    return res.status(status).json(message);
  };
}

// const getAllUserController = (_: Request, res: Response) => {
//   const users = getAllUsersService();
//   return res.status(200).json({ users: users });
// };

// const getUserByIdController = (req: Request, res: Response) => {
//   return res.status(200).json(userWOPassword(req.user));
// };

// const updateUserController = (req: Request, res: Response) => {
//   const updatedUser = updateUserService(req);
//   return res.status(200).json(updatedUser);
// };

// const deleteUserController = (req: Request, res: Response) => {
//   const deletedUser = deleteUserService(req);

//   return res.status(200).json(deletedUser);
// };

export default new UserController();
