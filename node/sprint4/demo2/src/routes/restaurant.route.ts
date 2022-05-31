import { Router } from "express";
import { restaurantController } from "../controllers";
import { isAdmin, validateSchema, validateToken } from "../middlewares";
import { createRestaurantSchema } from "../schemas";

const restaurantRouter = Router();

restaurantRouter.post(
  "",
  validateToken,
  validateSchema(createRestaurantSchema),
  isAdmin,
  restaurantController.createRestaurant
);

restaurantRouter.get("", restaurantController.getAll);

export default restaurantRouter;
