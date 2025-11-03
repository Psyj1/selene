import { farmService } from '../services/farmService.js';

const farmController = {
  // Criar fazenda
  async createFarm(req, res) {
    try {
      const farm = await farmService.createFarm(req.body);
      res.status(201).json(farm);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Buscar todas as fazendas
  async getFarms(req, res) {
    try {
      const farms = await farmService.getFarms();
      res.status(200).json(farms);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Buscar fazenda por ID
  async getFarmById(req, res) {
    try {
      const farm = await farmService.getFarmById(req.params.id);
      if (!farm) {
        return res.status(404).json({ error: 'Fazenda não encontrada' });
      }
      res.status(200).json(farm);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Atualizar fazenda
  async updateFarm(req, res) {
    try {
      const farm = await farmService.updateFarm(req.params.id, req.body);
      if (!farm) {
        return res.status(404).json({ error: 'Fazenda não encontrada' });
      }
      res.status(200).json(farm);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Deletar fazenda
  async deleteFarm(req, res) {
    try {
      const farm = await farmService.deleteFarm(req.params.id);
      if (!farm) {
        return res.status(404).json({ error: 'Fazenda não encontrada' });
      }
      res.status(200).json({ message: 'Fazenda deletada com sucesso' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

export default farmController;