import DB from "../database";
import { v4 } from "uuid";
import { hashSync } from "bcrypt";

const getAll = (_, res) => {
  const users = [];

  for (let i = 0; i < DB.length; i += 1) {
    const user = DB[i];
    const { password, ...userWithOutPassword } = user;

    users.push(userWithOutPassword);
  }

  return res.status(200).json({ users: users });
};

const getUserById = (req, res) => {
  const { user } = req;
  const { password, ...userWOPassword } = user;

  return res.status(200).json(userWOPassword);
};

const insertUser = (req, res) => {
  const { user } = req;

  user.password = hashSync(user.password, 10);

  const uuid = v4();

  DB.push({ ...user, uuid });

  const { password, ...newUser } = user;

  newUser.uuid = uuid;

  return res.status(201).json(newUser);
};

const deleteUser = (req, res) => {
  const { user } = req;
  const userIndex = DB.indexOf(user);
  // ARRAY.pop deleta o último indice
  DB.splice(userIndex, 1);

  return res.status(200).json(user);
};

export { getAll, getUserById, insertUser, deleteUser };
