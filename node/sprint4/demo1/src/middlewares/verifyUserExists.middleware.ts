import { NextFunction, Request, Response } from "express";
import { User } from "../entities";
import { ErrorHandler } from "../errors";
import { userRepository } from "../repositories";

const verifyUserExists = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const foundUser: User = await userRepository.findOne({
    email: (req.validated as User).email,
  });

  if (foundUser) {
    throw new ErrorHandler(409, "Email already exists.");
  }

  return next();
};

export default verifyUserExists;
