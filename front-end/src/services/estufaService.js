// services/estufaService.js - CORRIGIDO
import api from './api.js';

export const estufaService = {
  // GET todas as ESTUFAS (corrigido)
  getAllEstufas: async () => {
    try {
      const response = await api.get('/greenhouses'); // ← MUDEI para /greenhouses
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar estufas:', error);
      throw error;
    }
  },

  // GET uma estufa por ID
  getEstufaById: async (id) => {
    try {
      const response = await api.get(`/greenhouses/${id}`); // ← MUDEI para /greenhouses
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar estufa:', error);
      throw error;
    }
  },

  // POST criar nova estufa
  createEstufa: async (estufaData) => {
    try {
      const response = await api.post('/greenhouses', estufaData); // ← MUDEI para /greenhouses
      return response.data;
    } catch (error) {
      console.error('Erro ao criar estufa:', error);
      throw error;
    }
  },

  // PUT atualizar estufa
  updateEstufa: async (id, estufaData) => {
    try {
      const response = await api.put(`/greenhouses/${id}`, estufaData); // ← MUDEI para /greenhouses
      return response.data;
    } catch (error) {
      console.error('Erro ao atualizar estufa:', error);
      throw error;
    }
  },

  // DELETE estufa
  deleteEstufa: async (id) => {
    try {
      await api.delete(`/greenhouses/${id}`); // ← MUDEI para /greenhouses
    } catch (error) {
      console.error('Erro ao deletar estufa:', error);
      throw error;
    }
  }
};