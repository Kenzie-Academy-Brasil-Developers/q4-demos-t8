import { Router } from "express";
import {
  // getUserByIdOr404,
  verifyUserExists,
  // verifyToken,
  // userPermission,
} from "../middlewares";
import { userController } from "../controllers";

const router = Router(); // similar a blueprints no Flask

// router.get("/users", userControllergetAllUserController);
// router.get("/users/:uuid", getUserByIdOr404, getUserByIdController);

router.post(
  "/users/register",
  verifyUserExists,
  userController.insertUserController
);
router.post("/users/login", userController.loginController);

// router.patch(
//   "/users/:uuid",
//   verifyToken,
//   getUserByIdOr404,
//   userPermission,
//   updateUserController
// );

// router.delete("/users/:uuid", getUserByIdOr404, deleteUserController);

export default router;
