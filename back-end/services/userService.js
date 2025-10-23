import User from "../models/Users.js";

class userService {
  // Método para CADASTRAR usuário
  async Create(name, date, cpf, telefone, email, password) {
    try {
      const newUser = new User({
        name,
        date,
        cpf,
        telefone,
        email,
        password,
      });
      await newUser.save();
    } catch (error) {
      console.log(error);
    }
  }

  // MÉTODO para BUSCAR um USUÁRIO
  async getOne(email) {
    try {
      const user = await User.findOne({ email: email });
      return user;
    } catch (error) {
      console.log(error);
    }
  }
}

export default new userService();
