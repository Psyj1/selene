// routes/userRoutes.js
import express from "express";
const userRoutes = express.Router();
import userController from "../controllers/userController.js";

// Rota de login
userRoutes.post("/users/login", userController.loginUser);

// Rota de cadastro (create user)
userRoutes.post("/users", userController.createUser);

export default userRoutes;