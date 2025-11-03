// services/reportService.js
import api from './api.js';

export const reportService = {
  // GET todos os relatórios
  getAllReports: async () => {
    try {
      const response = await api.get('/reports');
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar relatórios:', error);
      throw error;
    }
  },

  // GET um relatório por ID
  getReportById: async (id) => {
    try {
      const response = await api.get(`/reports/${id}`);
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar relatório:', error);
      throw error;
    }
  },

  // POST criar novo relatório
  createReport: async (reportData) => {
    try {
      const response = await api.post('/reports', reportData);
      return response.data;
    } catch (error) {
      console.error('Erro ao criar relatório:', error);
      throw error;
    }
  },

  // PUT atualizar relatório
  updateReport: async (id, reportData) => {
    try {
      const response = await api.put(`/reports/${id}`, reportData);
      return response.data;
    } catch (error) {
      console.error('Erro ao atualizar relatório:', error);
      throw error;
    }
  },

  // DELETE relatório
  deleteReport: async (id) => {
    try {
      await api.delete(`/reports/${id}`);
    } catch (error) {
      console.error('Erro ao deletar relatório:', error);
      throw error;
    }
  }
};