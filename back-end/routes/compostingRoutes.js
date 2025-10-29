import express from "express";
const compostingRoutes = express.Router();
import compostingController from "../controllers/compostingController.js";
import Auth from "../middleware/auth.js";

// Rotas CORRIGIDAS - métodos que existem no controller
compostingRoutes.get("/compostings", compostingController.getCompostings);           // ← getCompostings
compostingRoutes.post("/compostings", compostingController.createComposting);        // ← createComposting
compostingRoutes.get("/compostings/:id", compostingController.getCompostingById);    // ← getCompostingById
compostingRoutes.put("/compostings/:id", compostingController.updateComposting);     // ← updateComposting
compostingRoutes.delete("/compostings/:id", compostingController.deleteComposting);  // ← deleteComposting

export default compostingRoutes;