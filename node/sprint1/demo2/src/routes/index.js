import { Router } from "express";
import { getUserByIdOr404, verifyUserExists } from "../middlewares";
import { deleteUser, getAll, getUserById, insertUser } from "../controllers";

const router = Router(); // similar a blueprints no Flask

router.get("/users", getAll);
router.get("/users/:uuid", getUserByIdOr404, getUserById);
router.post("/users/register", verifyUserExists, insertUser);
router.delete("/users/:uuid", getUserByIdOr404, deleteUser);

export default router;
