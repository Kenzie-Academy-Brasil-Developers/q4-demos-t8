import { userRepository } from "../repositories";
import { Request, Response, NextFunction } from "express";

const getUserByIdOr404 = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { uuid } = req.params;

  const user = await userRepository.retrieve({ uuid });

  if (!user) {
    return res.status(404).json({ message: "User not found." });
  }

  req.user = user;

  return next();
};

export default getUserByIdOr404;
