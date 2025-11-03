import express from "express";
const farmRoutes = express.Router();
import farmController from "../controllers/farmController.js";
import Auth from "../middleware/auth.js";

// Rotas para FAZENDAS (farms) - nomes corrigidos
farmRoutes.get("/farms", farmController.getFarms);           // ← getFarms
farmRoutes.post("/farms", farmController.createFarm);        // ← createFarm
farmRoutes.get("/farms/:id", farmController.getFarmById);    // ← getFarmById
farmRoutes.put("/farms/:id", farmController.updateFarm);     // ← updateFarm
farmRoutes.delete("/farms/:id", farmController.deleteFarm);  // ← deleteFarm

export default farmRoutes;