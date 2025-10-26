// 📍 FRONTEND: services/farmService.js
// CRIE este arquivo:

import api from './api.js';

export const farmService = {
  // GET todas as fazendas
  getAllFarms: async () => {
    try {
      const response = await api.get('/mushroom');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // GET uma fazenda por ID
  getFarmById: async (id) => {
    try {
      const response = await api.get(`/mushroom/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // POST criar nova fazenda
  createFarm: async (farmData) => {
    try {
      const response = await api.post('/mushroom', farmData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // PUT atualizar fazenda
  updateFarm: async (id, farmData) => {
    try {
      const response = await api.put(`/mushroom/${id}`, farmData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // DELETE fazenda
  deleteFarm: async (id) => {
    try {
      await api.delete(`/mushroom/${id}`);
    } catch (error) {
      throw error;
    }
  }
};