import {
  deleteUserService,
  getAllUsersService,
  insertUserService,
  loginService,
  updateUserService,
} from "../services";

import { userWOPassword } from "../utils";

const getAllUserController = (_, res) => {
  const users = getAllUsersService();
  return res.status(200).json({ users: users });
};

const getUserByIdController = (req, res) => {
  return res.status(200).json(userWOPassword(req.user));
};

const insertUserController = async (req, res) => {
  const newUser = await insertUserService(req);

  return res.status(201).json(newUser);
};

const loginController = async (req, res) => {
  const { status, message } = await loginService(req);
  return res.status(status).json(message);
};

const updateUserController = (req, res) => {
  const updatedUser = updateUserService(req);
  return res.status(200).json(updatedUser);
};

const deleteUserController = (req, res) => {
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
