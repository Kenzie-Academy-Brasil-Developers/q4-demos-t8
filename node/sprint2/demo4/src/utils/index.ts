import { User } from "../entities/User";

const userWOPassword = (user: User): Partial<User> => {
  const { password, ...userWOPwd } = user;
  return userWOPwd;
};

export { userWOPassword };
