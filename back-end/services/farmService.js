import Farm from '../models/Farm.js';

export const farmService = {
  // Criar fazenda
  createFarm: async (farmData) => {
    const farm = new Farm(farmData);
    return await farm.save();
  },

  // Buscar todas as fazendas
  getFarms: async () => {
    return await Farm.find();
  },

  // Buscar fazenda por ID
  getFarmById: async (id) => {
    return await Farm.findById(id);
  },

  // Atualizar fazenda
  updateFarm: async (id, farmData) => {
    return await Farm.findByIdAndUpdate(id, farmData, { 
      new: true, 
      runValidators: true 
    });
  },

  // Deletar fazenda
  deleteFarm: async (id) => {
    return await Farm.findByIdAndDelete(id);
  }
};