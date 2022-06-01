import { Router } from "express";
import productController from "../controllers/product.controller";
import { validateSchema, validateToken } from "../middlewares";
import { createProductsSchema } from "../schemas";

const productRouter = Router();

productRouter.post(
  "/:restaurantUuid",
  validateToken,
  validateSchema(createProductsSchema),
  productController.createProducts
);

export default productRouter
