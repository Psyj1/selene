// models/Farm.js  
import mongoose from "mongoose";

const farmSchema = new mongoose.Schema({
  nome: String,
  rua: String,
  bairro: String,
  numero: String,
  cidade: String,
  estado: String,
  foco_producao: String,
  area_total: Number,
  area_cultivo: Number,
  tipo_terreno: String,
  numero_estufas: Number,
  capacidade_producao: String,
  status_operacional: String,
  responsavel: String,
  telefone_responsavel: String,
  email_responsavel: String,
  cnpj: String
}, { collection: 'sitios/fazendas' }); // ← FORÇA a collection aqui

const Farm = mongoose.model("Farm", farmSchema);
export default Farm;