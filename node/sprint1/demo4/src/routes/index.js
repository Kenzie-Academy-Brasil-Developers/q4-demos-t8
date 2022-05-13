import { Router } from "express";
import {
  getUserByIdOr404,
  verifyUserExists,
  verifyToken,
  userPermission,
} from "../middlewares";
import {
  deleteUserController,
  getAllUserController,
  getUserByIdController,
  insertUserController,
  loginController,
  updateUserController,
} from "../controllers";

const router = Router(); // similar a blueprints no Flask

router.get("/users", getAllUserController);
router.get("/users/:uuid", getUserByIdOr404, getUserByIdController);

router.post("/users/register", verifyUserExists, insertUserController);
router.post("/users/login", loginController);

router.patch(
  "/users/:uuid",
  verifyToken,
  getUserByIdOr404,
  userPermission,
  updateUserController
);

router.delete("/users/:uuid", getUserByIdOr404, deleteUserController);

export default router;
