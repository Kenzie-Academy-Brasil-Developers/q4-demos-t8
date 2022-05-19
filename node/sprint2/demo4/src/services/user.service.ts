import { hash } from "bcrypt";
import dotenv from "dotenv";
import { Request } from "express";
import { sign } from "jsonwebtoken";
import { userWOPassword } from "../utils";
import { User } from "../entities/User";
import { userRepository } from "../repositories";

dotenv.config(); // load_dotenv()

interface IStatusMessage {
  status: number;
  message: object;
}

class UserService {
  insertUserService = async ({ body }: Request): Promise<Partial<User>> => {
    body.password = await hash(body.password, 10);
    const user = await userRepository.save({ ...body });

    return userWOPassword(user);
  };

  loginService = async ({ body }: Request): Promise<IStatusMessage> => {
    const foundUser = await userRepository.retrieve({
      email: body.email.toLowerCase(),
    });

    if (!foundUser) {
      return { status: 404, message: { message: "Invalid credentials." } };
    }

    if (!(await foundUser.comparePwd(body.password))) {
      return { status: 400, message: { message: "Invalid credentials." } };
    }

    // process.env = getenv
    const token = sign({ ...foundUser }, process.env.SECRET_KEY, {
      expiresIn: process.env.EXPIRES_IN,
    });

    return { status: 200, message: { token } };
  };

  getAllUsersService = async (): Promise<Partial<User>[]> => {
    const users = await (
      await userRepository.getAll()
    ).map((u: User) => userWOPassword(u));

    return users;
  };

  updateUserService = async ({
    user,
    body,
  }: Request): Promise<Partial<User>> => {
    await userRepository.update(user.uuid, { ...body });

    return userWOPassword({ ...user, ...body });
  };

  deleteUserService = async ({ user }: Request): Promise<Partial<User>> => {
    await userRepository.delete(user.uuid);

    return userWOPassword(user);
  };
}

export default new UserService();
