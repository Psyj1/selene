import express from "express";
const userRoutes = express.Router();
import userController from "../controllers/userController.js";
import Auth from "../middleware/auth.js";

// Rota de login (sem autenticação)
userRoutes.post("/users/login", userController.loginUser);

// Rotas CRUD de usuários/produtores
userRoutes.get("/users", userController.getAllUsers);
userRoutes.post("/users", userController.createUser);
userRoutes.get("/users/:id", userController.getUserById);
userRoutes.put("/users/:id", userController.updateUser);
userRoutes.delete("/users/:id", userController.deleteUser);

export default userRoutes;