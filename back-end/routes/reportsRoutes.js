import express from "express";
const reportRoutes = express.Router();
import reportController from "../controllers/reportController.js";
import Auth from "../middleware/auth.js";

// Rotas CORRIGIDAS - métodos que existem no controller
reportRoutes.get("/reports", reportController.getReports);           // ← getReports
reportRoutes.post("/reports", reportController.createReport);        // ← createReport
reportRoutes.get("/reports/:id", reportController.getReportById);    // ← getReportById
reportRoutes.put("/reports/:id", reportController.updateReport);     // ← updateReport
reportRoutes.delete("/reports/:id", reportController.deleteReport);  // ← deleteReport

export default reportRoutes;