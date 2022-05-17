import { IUser } from "../database";

const userWOPassword = (user: IUser) => {
  const { password, ...userWOPwd } = user;
  return userWOPwd;
};

export { userWOPassword };
