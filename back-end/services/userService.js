import User from '../models/Users.js';

const userService = {
  // Criar usuário/produtor
  async Create(nome, data_nascimento, cpf, telefone, email, senha) {
    try {
      const newUser = new User({
        nome,
        data_nascimento,
        cpf,
        telefone,
        email,
        senha
      });
      await newUser.save();
      return newUser;
    } catch (error) {
      throw new Error(`Erro ao criar usuário: ${error.message}`);
    }
  },

  // Buscar um usuário por email (para login)
  async getOne(email) {
    try {
      const user = await User.findOne({ email });
      return user;
    } catch (error) {
      throw new Error(`Erro ao buscar usuário: ${error.message}`);
    }
  },

  // Buscar todos os usuários/produtores
  async getAll() {
    try {
      const users = await User.find().select('-senha'); // Não retorna senha
      return users;
    } catch (error) {
      throw new Error(`Erro ao buscar usuários: ${error.message}`);
    }
  },

  // Buscar usuário por ID
  async getById(id) {
    try {
      const user = await User.findById(id).select('-senha');
      return user;
    } catch (error) {
      throw new Error(`Erro ao buscar usuário: ${error.message}`);
    }
  },

  // Atualizar usuário
  async update(id, userData) {
    try {
      const user = await User.findByIdAndUpdate(
        id,
        userData,
        { new: true, runValidators: true }
      ).select('-senha');
      return user;
    } catch (error) {
      throw new Error(`Erro ao atualizar usuário: ${error.message}`);
    }
  },

  // Deletar usuário
  async delete(id) {
    try {
      const user = await User.findByIdAndDelete(id);
      return user;
    } catch (error) {
      throw new Error(`Erro ao deletar usuário: ${error.message}`);
    }
  }
};

export default userService;