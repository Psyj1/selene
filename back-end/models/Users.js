import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  nome: String,
  data_nascimento: String,
  cpf: String,
  telefone: String,
  email: String,
  senha: String,
});

const User = mongoose.model("User", userSchema);

export default User;