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
}

// const getAllUsersService = () => {
//   const users = USERS_DB.map((u) => {
//     return userWOPassword(u);
//   });

//   return users;
// };

// const updateUserService = ({ user, body }) => {
//   Object.assign(user, body);

//   return userWOPassword({ ...user, ...body });
// };

// const deleteUserService = ({ user }) => {
//   const userIndex = USERS_DB.indexOf(user);
//   // ARRAY.pop deleta o último indice
//   USERS_DB.splice(userIndex, 1);

//   return userWOPassword(user);
// };

export default new UserService();
