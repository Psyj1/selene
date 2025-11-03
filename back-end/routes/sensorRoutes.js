import express from "express";
const sensorRoutes = express.Router();
import sensorController from "../controllers/sensorController.js";
import Auth from "../middleware/auth.js";

// Rotas para SENSORES
sensorRoutes.get("/sensors", sensorController.getSensors);
sensorRoutes.post("/sensors", sensorController.createSensor);
sensorRoutes.get("/sensors/:id", sensorController.getSensorById);
sensorRoutes.put("/sensors/:id", sensorController.updateSensor);
sensorRoutes.delete("/sensors/:id", sensorController.deleteSensor);

// Buscar sensores por estufa
sensorRoutes.get("/sensors/estufa/:estufaId", sensorController.getSensorsByEstufa);

export default sensorRoutes;