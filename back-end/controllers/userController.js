import userService from "../services/userService.js";
import jwt from "jsonwebtoken";

const JWTSecret = "apimushroom";

// CORRIGIDO: Campos corretos
const createUser = async (req, res) => {
  try {
    const { nome, data_nascimento, cpf, telefone, email, senha } = req.body;
    const newUser = await userService.Create(nome, data_nascimento, cpf, telefone, email, senha);
    res.status(201).json({ success: "Usuário registrado com sucesso", user: newUser });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
};

// CORRIGIDO: Login funcionando
const loginUser = async (req, res) => {
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
              res.status(200).json({ token, user: { id: user._id, nome: user.nome, email: user.email } });
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
    console.log(error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
};

export default { createUser, loginUser, JWTSecret };