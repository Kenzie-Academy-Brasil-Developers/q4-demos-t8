import { userRepository } from "../repositories";
import { Request, Response, NextFunction } from "express";

const verifyUserExists = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const foundUser = await userRepository.retrieve({
    email: req.body.email.toLowerCase(),
  });

  if (foundUser) {
    return res.status(409).json({ message: "email already exists!" });
  }

  return next();
};

// user_exists python snake_case
// userExists js cammelCase

export default verifyUserExists;
