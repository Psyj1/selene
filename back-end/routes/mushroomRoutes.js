import express from "express";
const mushroomRoutes = express.Router();
import mushroomController from "../controllers/mushroomController.js";
import Auth from "../middleware/auth.js";

mushroomRoutes.get("/mushroom", mushroomController.getAllMushroom);

mushroomRoutes.post("/mushroom", mushroomController.createMushroom);

mushroomRoutes.delete("/mushroom/:id", mushroomController.deleteMushroom);

mushroomRoutes.put("/mushroom/:id", mushroomController.updateMushroom);

mushroomRoutes.get("/mushroom/:id", mushroomController.getOneMushroom);

export default mushroomRoutes;
