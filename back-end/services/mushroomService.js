import Mushroom from "../models/Mushrooms.js";

class mushroomService {
    async getAll() {
        try{
            const mushrooms = await Mushroom.find();
            return mushrooms;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    // CORRIGIDO: Usando os campos corretos do model
    async Create(nome, rua, bairro, numero, cidade, estado, foco_producao, area_total, area_cultivo, tipo_terreno, numero_estufas, capacidade_producao, numero_compostos, status_operacional, responsavel, telefone_responsavel, email_responsavel, cnpj) {
        try {
            const newMushroom = new Mushroom({
                nome, rua, bairro, numero, cidade, estado, foco_producao, 
                area_total, area_cultivo, tipo_terreno, numero_estufas, 
                capacidade_producao, numero_compostos, status_operacional, 
                responsavel, telefone_responsavel, email_responsavel, cnpj
            });
            await newMushroom.save();
            return newMushroom;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async Delete(id) {
        try {
            await Mushroom.findByIdAndDelete(id);
            console.log(`Fazenda com id: ${id} deletada`);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    // CORRIGIDO: Campos atualizados
    async Update(id, updateData) {
        try {
            const updatedMushroom = await Mushroom.findByIdAndUpdate(id, updateData, { new: true });
            console.log(`Fazenda com id: ${id} atualizada`);
            return updatedMushroom;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async getOne(id) {
        try {
            const mushroom = await Mushroom.findById(id);
            return mushroom;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}

export default new mushroomService();