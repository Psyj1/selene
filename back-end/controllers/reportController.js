import { reportService } from '../services/reportService.js';

const reportController = {
  // Criar relatório
  async createReport(req, res) {
    try {
      const report = await reportService.createReport(req.body);
      res.status(201).json(report);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Buscar todos os relatórios
  async getReports(req, res) {
    try {
      const reports = await reportService.getReports();
      res.status(200).json(reports);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Buscar relatório por ID
  async getReportById(req, res) {
    try {
      const report = await reportService.getReportById(req.params.id);
      if (!report) {
        return res.status(404).json({ error: 'Relatório não encontrado' });
      }
      res.status(200).json(report);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Atualizar relatório
  async updateReport(req, res) {
    try {
      const report = await reportService.updateReport(req.params.id, req.body);
      if (!report) {
        return res.status(404).json({ error: 'Relatório não encontrado' });
      }
      res.status(200).json(report);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Deletar relatório
  async deleteReport(req, res) {
    try {
      const report = await reportService.deleteReport(req.params.id);
      if (!report) {
        return res.status(404).json({ error: 'Relatório não encontrado' });
      }
      res.status(200).json({ message: 'Relatório deletado com sucesso' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

export default reportController;