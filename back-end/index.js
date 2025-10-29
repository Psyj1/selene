import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import "../back-end/config/db-connection.js";
const app = express();

app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));


// Importando as rotas
import mushroomRoutes from "./routes/farmRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import compostingRoutes from "./routes/compostingRoutes.js";
import greenhouseRoutes from "./routes/greenhouseRoutes.js";
import reportsRoutes from "./routes/reportsRoutes.js";

// Configurações do Express
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Rotas
app.use("/", mushroomRoutes);
app.use("/", userRoutes);
app.use("/", compostingRoutes);
app.use("/", greenhouseRoutes);
app.use("/", reportsRoutes);

// Rodando a API na porta 4000
const port = 4000;
app.listen(port, (error) => {
  if (error) {
    console.log(error);
  }
  console.log(`API running in http://localhost:${port}`);
});