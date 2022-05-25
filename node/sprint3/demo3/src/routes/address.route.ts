import { Router } from "express";
import { addressController } from "../controllers";
import {
  validadeSchema,
  validateToken,
  verifyAddressAlreadyExists,
} from "../middlewares";
import { createAddressSchema } from "../schemas";

const addressRouter = Router();

addressRouter.post(
  "",
  validateToken,
  validadeSchema(createAddressSchema),
  verifyAddressAlreadyExists,
  addressController.createAddress
);

addressRouter.patch("");

export default addressRouter;
