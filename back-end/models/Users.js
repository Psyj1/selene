import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  date: String,
  cpf: String,
  telefone: Number,
  email: String,
  password: String,
});

const User = mongoose.model("User", userSchema);

export default User;