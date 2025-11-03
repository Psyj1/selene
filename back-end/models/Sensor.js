import mongoose from "mongoose";

const sensorSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true
  },
  codigo: {
    type: String,
    required: true,
    unique: true
  },
  tipo: {
    type: String,
    required: true,
    enum: ['Temperatura', 'Umidade', 'CO2', 'pH', 'Luminosidade']
  },
  estufa_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Greenhouse',
    required: false
  },
  status: {
    type: String,
    enum: ['Ativo', 'Inativo', 'Manutenção'],
    default: 'Ativo'
  },
  bateria: {
    type: Number,
    min: 0,
    max: 100,
    default: 100
  },
  ultimaLeitura: {
    type: Date,
    default: Date.now
  },
  valor_atual: {
    type: Number,
    default: 0
  },
  unidade: {
    type: String,
    default: ''
  },
  localizacao: {
    type: String,
    default: ''
  }
}, { 
  timestamps: true,
  collection: 'sensores' 
});

const Sensor = mongoose.model("Sensor", sensorSchema);
export default Sensor;