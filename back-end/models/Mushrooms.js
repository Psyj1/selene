import mongoose from "mongoose";

const mushroomSchema = new mongoose.Schema({
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
  numero_compostos: Number,
  status_operacional: String,
  responsavel: String,
  telefone_responsavel: String,
  email_responsavel: String,
  cnpj: String
});

const mushroom = mongoose.model("mushroom", mushroomSchema);

export default mushroom;