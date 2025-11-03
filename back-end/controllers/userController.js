import userService from "../services/userService.js";
import jwt from "jsonwebtoken";

const JWTSecret = "apimushroom";

const userController = {
  // Criar usuário
  async createUser(req, res) {
    try {
      const { nome, data_nascimento, cpf, telefone, email, senha } = req.body;
      const newUser = await userService.Create(nome, data_nascimento, cpf, telefone, email, senha);
      res.status(201).json({ success: "Usuário registrado com sucesso", user: newUser });
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
      res.status(500).json({ error: error.message });
    }
  },

  // Login
  async loginUser(req, res) {
    try {
      const { email, senha } = req.body;
      const user = await userService.getOne(email);
      
      if (user) {
        if (user.senha === senha) {
          jwt.sign(
            { id: user._id, email: user.email }, 
            JWTSecret, 
            { expiresIn: "48h" }, 
            (error, token) => {
              if (error) {
                res.status(400).json({ error: "Não foi possível gerar o token" });
              } else {
                res.status(200).json({ 
                  token, 
                  user: { 
                    id: user._id, 
                    nome: user.nome, 
                    email: user.email 
                  } 
                });
              }
            }
          );
        } else {
          res.status(401).json({ error: 'Credenciais inválidas' });
        }
      } else {
        res.status(404).json({ error: "Usuário não encontrado!" });
      }
    } catch (error) {
      console.error('Erro no login:', error);
      res.status(500).json({ error: error.message });
    }
  },

  // Buscar todos os usuários
  async getAllUsers(req, res) {
    try {
      const users = await userService.getAll();
      res.status(200).json(users);
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
      res.status(500).json({ error: error.message });
    }
  },

  // Buscar usuário por ID
  async getUserById(req, res) {
    try {
      const user = await userService.getById(req.params.id);
      if (!user) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
      }
      res.status(200).json(user);
    } catch (error) {
      console.error('Erro ao buscar usuário:', error);
      res.status(500).json({ error: error.message });
    }
  },

  // Atualizar usuário
  async updateUser(req, res) {
    try {
      const user = await userService.update(req.params.id, req.body);
      if (!user) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
      }
      res.status(200).json(user);
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error);
      res.status(400).json({ error: error.message });
    }
  },

  // Deletar usuário
  async deleteUser(req, res) {
    try {
      const user = await userService.delete(req.params.id);
      if (!user) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
      }
      res.status(200).json({ message: 'Usuário deletado com sucesso' });
    } catch (error) {
      console.error('Erro ao deletar usuário:', error);
      res.status(500).json({ error: error.message });
    }
  }
};

export default { ...userController, JWTSecret };