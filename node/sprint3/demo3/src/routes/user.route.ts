import { Router } from "express";
import { userController } from "../controllers";
import { validadeSchema, verifyUserExists } from "../middlewares";
import { createUserSchema } from "../schemas/user/createUser.schema";
import loginUserSchema from "../schemas/user/loginUser.schema";

const userRouter = Router();

userRouter.post(
  "/login",
  validadeSchema(loginUserSchema),
  userController.loginUser
);
userRouter.post(
  "/register",
  validadeSchema(createUserSchema),
  verifyUserExists,
  userController.createUser
);

export default userRouter;
