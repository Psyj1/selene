// models/Greenhouse.js
import mongoose from "mongoose";

const greenhouseSchema = new mongoose.Schema({
  nome: String,
  codigo: String,
  status: String,
  descricao: String,
  tipo: String,
  plantio: {
    substrato: String,
    data_plantio: Date,
    tipo_cogumelo: String,
    data_coleta: Date
  },
  numero_compostos: String
}, { collection: 'estufas' });

const Greenhouse = mongoose.model("Greenhouse", greenhouseSchema, "estufas");
export default Greenhouse;