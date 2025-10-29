// services/produtorService.js
import api from './api.js';

export const produtorService = {
  // GET todos os produtores
  getAllProdutores: async () => {
    try {
      const response = await api.get('/users');
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar produtores:', error);
      throw error;
    }
  },

  // GET um produtor por ID
  getProdutorById: async (id) => {
    try {
      const response = await api.get(`/users/${id}`);
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar produtor:', error);
      throw error;
    }
  },

  // POST criar novo produtor
  createProdutor: async (produtorData) => {
    try {
      const response = await api.post('/users', produtorData);
      return response.data;
    } catch (error) {
      console.error('Erro ao criar produtor:', error);
      throw error;
    }
  },

  // PUT atualizar produtor
  updateProdutor: async (id, produtorData) => {
    try {
      const response = await api.put(`/users/${id}`, produtorData);
      return response.data;
    } catch (error) {
      console.error('Erro ao atualizar produtor:', error);
      throw error;
    }
  },

  // DELETE produtor
  deleteProdutor: async (id) => {
    try {
      await api.delete(`/users/${id}`);
    } catch (error) {
      console.error('Erro ao deletar produtor:', error);
      throw error;
    }
  }
};