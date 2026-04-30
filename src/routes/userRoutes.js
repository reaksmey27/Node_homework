import express from "express";
import userController from "../controllers/userController.js";

const router = express.Router();

// CRUD Routes
router.get("/users", userController.getUsers);
router.get("/users/:id", userController.getUserById);
router.post("/users", userController.createUser);
router.put("/users/:id", userController.updateUser);
router.delete("/users/:id", userController.deleteUser);

export default router;