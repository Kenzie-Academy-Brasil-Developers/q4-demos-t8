import { USERS_DB } from "../database";
import { Request, Response, NextFunction } from "express";

const verifyUserExists = (req: Request, res: Response, next: NextFunction) => {
  const foundUser = USERS_DB.find(
    ({ email }) => email.toLowerCase() === req.body.email.toLowerCase()
  );

  if (foundUser) {
    return res.status(409).json({ message: "email already exists!" });
  }

  return next();
};

// user_exists python snake_case
// userExists js cammelCase

export default verifyUserExists;
