import Report from '../models/Report.js';

export const reportService = {
  // Criar relatório
  createReport: async (reportData) => {
    const report = new Report(reportData);
    return await report.save();
  },

  // Buscar todos os relatórios
  getReports: async () => {
    return await Report.find();
  },

  // Buscar relatório por ID
  getReportById: async (id) => {
    return await Report.findById(id);
  },

  // Atualizar relatório
  updateReport: async (id, reportData) => {
    return await Report.findByIdAndUpdate(id, reportData, { 
      new: true, 
      runValidators: true 
    });
  },

  // Deletar relatório
  deleteReport: async (id) => {
    return await Report.findByIdAndDelete(id);
  }
};