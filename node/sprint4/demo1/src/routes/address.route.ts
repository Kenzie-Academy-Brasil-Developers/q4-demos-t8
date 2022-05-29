import { Router } from "express";
import { addressController } from "../controllers";
import {
  validateSchema,
  validateToken,
  verifyAddressAlreadyExists,
} from "../middlewares";
import { createAddressSchema } from "../schemas";

const addressRouter = Router();

addressRouter.post(
  "",
  validateToken,
  validateSchema(createAddressSchema),
  verifyAddressAlreadyExists,
  addressController.createAddress
);

addressRouter.patch("");

export default addressRouter;
