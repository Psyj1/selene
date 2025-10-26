import api from './api.js';

// Usa as mesmas rotas do mushroom, mas com nome mais claro
export const estufaService = {
  // GET todas as estufas/fazendas
  getAllEstufas: async () => {
    try {
      const response = await api.get('/mushroom');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // GET uma estufa/fazenda por ID
  getEstufaById: async (id) => {
    try {
      const response = await api.get(`/mushroom/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // POST criar nova estufa/fazenda
  createEstufa: async (estufaData) => {
    try {
      const response = await api.post('/mushroom', estufaData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // PUT atualizar estufa/fazenda
  updateEstufa: async (id, estufaData) => {
    try {
      const response = await api.put(`/mushroom/${id}`, estufaData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // DELETE estufa/fazenda
  deleteEstufa: async (id) => {
    try {
      await api.delete(`/mushroom/${id}`);
    } catch (error) {
      throw error;
    }
  }
};