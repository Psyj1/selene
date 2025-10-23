import Mushroom from "../models/Mushrooms.js";

class mushroomService {
    async getAll() {
        try{
            const mushrooms = await Mushroom.find();
            return mushrooms;
        } catch (error) {
            console.log(error);
        }
    }

    //Funçao para cadastrar os "estufa"
    async Create(title, number, status, descricao, composting) {
        try {
            const newMushroom = new Mushroom({
                title,
                number,
                status,
                descricao,
                composting
            });
            await newMushroom.save();
        }catch (error) {
            console.log(error);
        }
    }
    async Delete(id) {
        try {
            await Mushroom.findByIdAndDelete(id);
            console.log(`mushroom with id: ${id} the deleted`)
        }catch (error) {
            console.log(error);
        }
    }

    //ALTERAR
    async Update(id, title, number, status, descricao, composting) {
        try {
            await Mushroom.findByIdAndUpdate(id, {
                title,
                number,
                status,
                descricao,
                composting
            });
            console.log(`Game data with id: ${id} successfully updated.`)
        } catch (error) {
            console.log(error);
        }
    }

    //LISTAR UM FUNGO
    async getOne(id) {
        try {
            const mushroom = await Mushroom.findOne({ _id: id});
            return mushroom;
        }catch (error) {
            console.log(error);
        }
    }
}

export default new mushroomService();