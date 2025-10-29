// models/Composting.js
import mongoose from "mongoose";

const compostingSchema = new mongoose.Schema({
  temperatura: Number,
  umidade: Number,
  dt_leitura: Date,
  hora_leitura: String,
  pragas: [{
    nivel_risco: String,
    chance_presenca: String,
    data_atualizacao: Date,
    hora_atualizacao: String
  }]
}, { collection: 'compostos' });

const Composting = mongoose.model("Composting", compostingSchema, "compostos");
export default Composting;