import { sign } from "jsonwebtoken";
import { v4 } from "uuid";
import USERS_DB from "../database";
import { userWOPassword } from "../utils";
import dotenv from "dotenv";
import { hash } from "bcrypt";
import { compare } from 'bcrypt';

dotenv.config(); // load_dotenv()

const getAllUsersService = () => {
  const users = USERS_DB.map((u) => {
    return userWOPassword(u);
  });

  return users;
};

const insertUserService = async ({ body }) => {
  body.uuid = v4();
  body.password = await hash(body.password, 10);

  if (!body.isAdmin) {
    body.isAdmin = false;
  }

  USERS_DB.push(body);

  const newUser = userWOPassword(body);

  return newUser;
};

const loginService = async ({ body }) => {
  const foundUser = USERS_DB.find((u) => u.email === body.email);

  if (!foundUser) {
    return { status: 404, message: { message: "Invalid credentials." } };
  }

  if (!(await compare(body.password, foundUser.password))) {
    return { status: 400, message: { message: "Invalid credentials." } };
  }

  // process.env = getenv
  const token = sign({ email: foundUser.email }, process.env.SECRET_KEY, {
    expiresIn: process.env.EXPIRES_IN,
  });

  return { status: 200, message: { token } };
};

const updateUserService = ({ user, body }) => {
  Object.assign(user, body);

  return userWOPassword({ ...user, ...body });
};

const deleteUserService = ({ user }) => {
  const userIndex = USERS_DB.indexOf(user);
  // ARRAY.pop deleta o último indice
  USERS_DB.splice(userIndex, 1);

  return userWOPassword(user);
};

export {
  getAllUsersService,
  insertUserService,
  loginService,
  updateUserService,
  deleteUserService,
};
