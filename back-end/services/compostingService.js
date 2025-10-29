import Composting from '../models/Composting.js';

export const compostingService = {
  // Criar composto
  createComposting: async (compostingData) => {
    const composting = new Composting(compostingData);
    return await composting.save();
  },

  // Buscar todos os compostos
  getCompostings: async () => {
    return await Composting.find();
  },

  // Buscar composto por ID
  getCompostingById: async (id) => {
    return await Composting.findById(id);
  },

  // Atualizar composto
  updateComposting: async (id, compostingData) => {
    return await Composting.findByIdAndUpdate(id, compostingData, { 
      new: true, 
      runValidators: true 
    });
  },

  // Deletar composto
  deleteComposting: async (id) => {
    return await Composting.findByIdAndDelete(id);
  }
};