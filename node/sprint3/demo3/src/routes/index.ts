import { Express } from "express";
import addressRouter from "./address.route";
import userRouter from "./user.route";

const registerRouters = (app: Express): void => {
  // init_app
  app.use(userRouter);
  app.use("/addresses", addressRouter);
};

export default registerRouters;
