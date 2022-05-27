import { Request, Response, NextFunction } from "express";
import { ErrorHandler } from "../errors";

const isAdmin = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.decoded.isAdmin) {
    throw new ErrorHandler(401, "Permission denied");
  }

  return next();
};

export default isAdmin;
