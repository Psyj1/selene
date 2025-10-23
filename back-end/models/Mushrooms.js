import mongoose from "mongoose";

const composting = new mongoose.Schema({
  substract: String,
  date: Date,
  type: String,
});

const mushroomSchema = new mongoose.Schema({
  title: String,
  number: number,
  status: Boolean,
  descricao: String,
});

const mushroom = mongoose.model("mushroom", mushroomSchema);

export default mushroom;
