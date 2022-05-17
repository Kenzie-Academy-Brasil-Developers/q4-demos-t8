import { USERS_DB } from "../database";
import { Request, Response, NextFunction } from "express";

const getUserByIdOr404 = (req: Request, res: Response, next: NextFunction) => {
  const { uuid } = req.params;

  const user = USERS_DB.find((u) => u.uuid === uuid);

  if (!user) {
    return res.status(404).json({ message: "User not found." });
  }

  req.user = user;

  return next();
};

export default getUserByIdOr404;
