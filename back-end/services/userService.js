import User from "../models/Users.js";

class userService {
  // CORRIGIDO: Campos do model User
  async Create(nome, data_nascimento, cpf, telefone, email, senha) {
    try {
      const newUser = new User({
        nome,
        data_nascimento,
        cpf,
        telefone,
        email,
        senha,
      });
      await newUser.save();
      return newUser;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async getOne(email) {
    try {
      const user = await User.findOne({ email: email });
      return user;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

export default new userService();