import { NextFunction, Request, Response } from "express";
import { User } from "../entities";
import { ErrorHandler } from "../errors";
import { userRepository } from "../repositories";

const verifyAddressAlreadyExists = async (
  req: Request,
  _: Response,
  next: NextFunction
) => {
  const foundUser: User = await userRepository.findOne({
    email: (req.decoded as User).email,
  });

  if (await foundUser.address) {
    throw new ErrorHandler(409, "User already has a address.");
  }

  return next();
};

export default verifyAddressAlreadyExists;
