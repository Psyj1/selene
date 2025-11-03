import Sensor from '../models/Sensor.js';

const sensorService = {
  // Criar sensor
  async createSensor(sensorData) {
    try {
      const sensor = new Sensor(sensorData);
      await sensor.save();
      return sensor;
    } catch (error) {
      throw new Error(`Erro ao criar sensor: ${error.message}`);
    }
  },

  // Buscar todos os sensores
  async getSensors() {
    try {
      const sensors = await Sensor.find().populate('estufa_id', 'nome codigo');
      return sensors;
    } catch (error) {
      throw new Error(`Erro ao buscar sensores: ${error.message}`);
    }
  },

  // Buscar sensor por ID
  async getSensorById(id) {
    try {
      const sensor = await Sensor.findById(id).populate('estufa_id', 'nome codigo');
      return sensor;
    } catch (error) {
      throw new Error(`Erro ao buscar sensor: ${error.message}`);
    }
  },

  // Atualizar sensor
  async updateSensor(id, sensorData) {
    try {
      const sensor = await Sensor.findByIdAndUpdate(
        id,
        sensorData,
        { new: true, runValidators: true }
      );
      return sensor;
    } catch (error) {
      throw new Error(`Erro ao atualizar sensor: ${error.message}`);
    }
  },

  // Deletar sensor
  async deleteSensor(id) {
    try {
      const sensor = await Sensor.findByIdAndDelete(id);
      return sensor;
    } catch (error) {
      throw new Error(`Erro ao deletar sensor: ${error.message}`);
    }
  },

  // Buscar sensores por estufa
  async getSensorsByEstufa(estufaId) {
    try {
      const sensors = await Sensor.find({ estufa_id: estufaId });
      return sensors;
    } catch (error) {
      throw new Error(`Erro ao buscar sensores da estufa: ${error.message}`);
    }
  }
};

export default sensorService;