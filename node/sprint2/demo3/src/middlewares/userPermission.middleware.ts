import { userRepository } from "../repositories";
import { Request, Response, NextFunction } from "express";

const userPermission = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const decodedUser = await userRepository.retrieve({
    email: req.decoded.email,
  });
  const paramsUser = req.user;

  if (decodedUser.isAdmin) {
    return next();
  }

  if (decodedUser != paramsUser) {
    return res.status(403).json({ message: "You can't update another user." });
  }

  return next();
};

export default userPermission;
