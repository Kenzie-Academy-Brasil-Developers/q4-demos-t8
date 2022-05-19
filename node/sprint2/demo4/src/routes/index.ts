import { Router } from "express";
import {
  getUserByIdOr404,
  userPermission,
  verifyToken,
  verifyUserExists,
} from "../middlewares";
import { userController } from "../controllers";

const router = Router(); // similar a blueprints no Flask

router.get("/users", userController.getAllUserController);
router.get(
  "/users/:uuid",
  getUserByIdOr404,
  userController.getUserByIdController
);

router.post(
  "/users/register",
  verifyUserExists,
  userController.insertUserController
);
router.post("/users/login", userController.loginController);

router.patch(
  "/users/:uuid",
  verifyToken,
  getUserByIdOr404,
  userPermission,
  userController.updateUserController
);

router.delete(
  "/users/:uuid",
  verifyToken,
  getUserByIdOr404,
  userPermission,
  userController.deleteUserController
);

export default router;
