// services/farmService.js - CORRIGIDO
import api from './api.js';

export const farmService = {
  // GET todas as fazendas
  getAllFarms: async () => {
    try {
      const response = await api.get('/farms'); // ← MUDEI de '/mushroom' para '/farms'
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // GET uma fazenda por ID
  getFarmById: async (id) => {
    try {
      const response = await api.get(`/farms/${id}`); // ← MUDEI aqui também
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // POST criar nova fazenda
  createFarm: async (farmData) => {
    try {
      const response = await api.post('/farms', farmData); // ← MUDEI aqui também
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // PUT atualizar fazenda
  updateFarm: async (id, farmData) => {
    try {
      const response = await api.put(`/farms/${id}`, farmData); // ← MUDEI aqui também
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // DELETE fazenda
  deleteFarm: async (id) => {
    try {
      await api.delete(`/farms/${id}`); // ← MUDEI aqui também
    } catch (error) {
      throw error;
    }
  }
};