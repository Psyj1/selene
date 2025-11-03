// services/sensorService.js
import api from './api.js';

export const sensorService = {
  // GET todos os sensores
  getAllSensors: async () => {
    try {
      const response = await api.get('/sensors');
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar sensores:', error);
      throw error;
    }
  },

  // GET um sensor por ID
  getSensorById: async (id) => {
    try {
      const response = await api.get(`/sensors/${id}`);
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar sensor:', error);
      throw error;
    }
  },

  // POST criar novo sensor
  createSensor: async (sensorData) => {
    try {
      const response = await api.post('/sensors', sensorData);
      return response.data;
    } catch (error) {
      console.error('Erro ao criar sensor:', error);
      throw error;
    }
  },

  // PUT atualizar sensor
  updateSensor: async (id, sensorData) => {
    try {
      const response = await api.put(`/sensors/${id}`, sensorData);
      return response.data;
    } catch (error) {
      console.error('Erro ao atualizar sensor:', error);
      throw error;
    }
  },

  // DELETE sensor
  deleteSensor: async (id) => {
    try {
      await api.delete(`/sensors/${id}`);
    } catch (error) {
      console.error('Erro ao deletar sensor:', error);
      throw error;
    }
  }
};