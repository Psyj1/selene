import { compostingService } from '../services/compostingService.js';

const compostingController = {
  // Criar composto
  async createComposting(req, res) {
    try {
      const composting = await compostingService.createComposting(req.body);
      res.status(201).json(composting);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Buscar todos os compostos
  async getCompostings(req, res) {
    try {
      const compostings = await compostingService.getCompostings();
      res.status(200).json(compostings);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Buscar composto por ID
  async getCompostingById(req, res) {
    try {
      const composting = await compostingService.getCompostingById(req.params.id);
      if (!composting) {
        return res.status(404).json({ error: 'Composto não encontrado' });
      }
      res.status(200).json(composting);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Atualizar composto
  async updateComposting(req, res) {
    try {
      const composting = await compostingService.updateComposting(req.params.id, req.body);
      if (!composting) {
        return res.status(404).json({ error: 'Composto não encontrado' });
      }
      res.status(200).json(composting);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Deletar composto
  async deleteComposting(req, res) {
    try {
      const composting = await compostingService.deleteComposting(req.params.id);
      if (!composting) {
        return res.status(404).json({ error: 'Composto não encontrado' });
      }
      res.status(200).json({ message: 'Composto deletado com sucesso' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

export default compostingController;