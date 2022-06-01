import { Express } from "express";
import addressRouter from "./address.route";
import productRouter from "./product.route";
import restaurantRouter from "./restaurant.route";
import userRouter from "./user.route";

const registerRouters = (app: Express): void => {
  // init_app
  app.use(userRouter);
  app.use("/addresses", addressRouter);
  app.use("/restaurants", restaurantRouter);
  app.use("/products", productRouter);
};

export default registerRouters;
