import express from "express";
import userController from "../controllers/userController.js";
const userRoutes = express.Router();

userRoutes.post("/user", userController.createUser);

userRoutes.post("/auth", userController.loginUser);

export default userRoutes;
