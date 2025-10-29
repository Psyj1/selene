import Greenhouse from '../models/Greenhouse.js';

export const greenhouseService = {
  // Criar estufa
  createGreenhouse: async (greenhouseData) => {
    const greenhouse = new Greenhouse(greenhouseData);
    return await greenhouse.save();
  },

  // Buscar todas as estufas
  getGreenhouses: async () => {
    return await Greenhouse.find();
  },

  // Buscar estufa por ID
  getGreenhouseById: async (id) => {
    return await Greenhouse.findById(id);
  },

  // Atualizar estufa
  updateGreenhouse: async (id, greenhouseData) => {
    return await Greenhouse.findByIdAndUpdate(id, greenhouseData, { 
      new: true, 
      runValidators: true 
    });
  },

  // Deletar estufa
  deleteGreenhouse: async (id) => {
    return await Greenhouse.findByIdAndDelete(id);
  }
};