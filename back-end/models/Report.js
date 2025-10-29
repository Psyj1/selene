// models/Report.js
import mongoose from "mongoose";

const reportSchema = new mongoose.Schema({
  titulo: String,
  descricao: String,
  status: String,
  data: Date,
  hora: String
}, { collection: 'relatorios' });

const Report = mongoose.model("Report", reportSchema, "relatorios");
export default Report;