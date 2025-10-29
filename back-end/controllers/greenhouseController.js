import { greenhouseService } from '../services/greenhouseService.js';

const greenhouseController = {
  // Criar estufa
  async createGreenhouse(req, res) {
    try {
      const greenhouse = await greenhouseService.createGreenhouse(req.body);
      res.status(201).json(greenhouse);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Buscar todas as estufas
  async getGreenhouses(req, res) {
    try {
      const greenhouses = await greenhouseService.getGreenhouses();
      res.status(200).json(greenhouses);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Buscar estufa por ID
  async getGreenhouseById(req, res) {
    try {
      const greenhouse = await greenhouseService.getGreenhouseById(req.params.id);
      if (!greenhouse) {
        return res.status(404).json({ error: 'Estufa não encontrada' });
      }
      res.status(200).json(greenhouse);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Atualizar estufa
  async updateGreenhouse(req, res) {
    try {
      const greenhouse = await greenhouseService.updateGreenhouse(req.params.id, req.body);
      if (!greenhouse) {
        return res.status(404).json({ error: 'Estufa não encontrada' });
      }
      res.status(200).json(greenhouse);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Deletar estufa
  async deleteGreenhouse(req, res) {
    try {
      const greenhouse = await greenhouseService.deleteGreenhouse(req.params.id);
      if (!greenhouse) {
        return res.status(404).json({ error: 'Estufa não encontrada' });
      }
      res.status(200).json({ message: 'Estufa deletada com sucesso' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

export default greenhouseController;