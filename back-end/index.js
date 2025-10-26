import express from "express";
import mongoose from "mongoose";
import connect from "./config/db-connection.js";
import cors from "cors"; // ← CONFIRME que tem esta linha

// Importando as rotas
import mushroomRoutes from "./routes/mushroomRoutes.js";
import userRoutes from "./routes/userRoutes.js";

const app = express();

// ← CONFIRME que tem ESTE BLOCO DE CORS
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// Configurações do Express
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Rotas
app.use("/", mushroomRoutes);
app.use("/", userRoutes);

// Rodando a API na porta 4000
const port = 4000;
app.listen(port, (error) => {
  if (error) {
    console.log(error);
  }
  console.log(`API running in http://localhost:${port}`);
});