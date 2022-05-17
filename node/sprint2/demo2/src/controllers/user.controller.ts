import {
  deleteUserService,
  getAllUsersService,
  insertUserService,
  loginService,
  updateUserService,
} from "../services";

import { Request, Response } from "express";

import { userWOPassword } from "../utils";

const getAllUserController = (_: Request, res: Response) => {
  const users = getAllUsersService();
  return res.status(200).json({ users: users });
};

const getUserByIdController = (req: Request, res: Response) => {
  return res.status(200).json(userWOPassword(req.user));
};

const insertUserController = async (req: Request, res: Response) => {
  const newUser = await insertUserService(req);

  return res.status(201).json(newUser);
};

const loginController = async (req: Request, res: Response) => {
  const { status, message } = await loginService(req);
  return res.status(status).json(message);
};

const updateUserController = (req: Request, res: Response) => {
  const updatedUser = updateUserService(req);
  return res.status(200).json(updatedUser);
};

const deleteUserController = (req: Request, res: Response) => {
  const deletedUser = deleteUserService(req);

  return res.status(200).json(deletedUser);
};

export {
  insertUserController,
  loginController,
  getAllUserController,
  getUserByIdController,
  updateUserController,
  deleteUserController,
};
