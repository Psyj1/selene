import express from "express";
const greenhouseRoutes = express.Router();
import greenhouseController from "../controllers/greenhouseController.js";
import Auth from "../middleware/auth.js";

// Rotas CORRIGIDAS - métodos que existem no controller
greenhouseRoutes.get("/greenhouses", greenhouseController.getGreenhouses);           // ← getGreenhouses
greenhouseRoutes.post("/greenhouses", greenhouseController.createGreenhouse);        // ← createGreenhouse
greenhouseRoutes.get("/greenhouses/:id", greenhouseController.getGreenhouseById);    // ← getGreenhouseById
greenhouseRoutes.put("/greenhouses/:id", greenhouseController.updateGreenhouse);     // ← updateGreenhouse
greenhouseRoutes.delete("/greenhouses/:id", greenhouseController.deleteGreenhouse);  // ← deleteGreenhouse

export default greenhouseRoutes;