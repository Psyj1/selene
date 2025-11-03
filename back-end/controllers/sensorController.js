import sensorService from '../services/sensorService.js';

const sensorController = {
  // Criar sensor
  async createSensor(req, res) {
    try {
      const sensor = await sensorService.createSensor(req.body);
      res.status(201).json(sensor);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Buscar todos os sensores
  async getSensors(req, res) {
    try {
      const sensors = await sensorService.getSensors();
      res.status(200).json(sensors);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Buscar sensor por ID
  async getSensorById(req, res) {
    try {
      const sensor = await sensorService.getSensorById(req.params.id);
      if (!sensor) {
        return res.status(404).json({ error: 'Sensor não encontrado' });
      }
      res.status(200).json(sensor);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Atualizar sensor
  async updateSensor(req, res) {
    try {
      const sensor = await sensorService.updateSensor(req.params.id, req.body);
      if (!sensor) {
        return res.status(404).json({ error: 'Sensor não encontrado' });
      }
      res.status(200).json(sensor);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Deletar sensor
  async deleteSensor(req, res) {
    try {
      const sensor = await sensorService.deleteSensor(req.params.id);
      if (!sensor) {
        return res.status(404).json({ error: 'Sensor não encontrado' });
      }
      res.status(200).json({ message: 'Sensor deletado com sucesso' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Buscar sensores por estufa
  async getSensorsByEstufa(req, res) {
    try {
      const sensors = await sensorService.getSensorsByEstufa(req.params.estufaId);
      res.status(200).json(sensors);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

export default sensorController;