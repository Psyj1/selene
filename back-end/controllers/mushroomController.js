import mushroomService from "../services/mushroomService.js";
import { ObjectId } from "mongodb";

const getAllMushroom = async (req, res) => {
  try {
    const mushrooms = await mushroomService.getAll();
    res.status(200).json({ mushrooms: mushrooms });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error." });
  }
};

//CADASTRAR Fungo
const createMushroom = async (req, res) => {
  try {
    const { title, number, status, descricao, composting } = req.body;
    //CADAS.Banco
    await mushroomService.Create(title, number, composting);
    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error." });
  }
};

//DELETAR FUNGO
const deleteMushroom = async (req, res) => {
  try {
    if (ObjectId.isValid(req.params.id)) {
      const id = req.params.id;
      mushroomService.Delete(id);
      res.sendStatus(204);
    } else {
      res.sendStatus(400);
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(500).json({ error: "Internal server error." });
  }
};

//ALTERAR
const updateMushroom = async (req, res) => {
  try {
    if (ObjectId.isValid(req.params.id)) {
      const id = req.params.id;
      const { title, number, status, descricao, composting } = req.body;
      mushroomService.Update(id, title, number, status, descricao, composting);
      res.sendStatus(200);
    } else {
      res.sendStatus(400);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error." });
  }
};

//Buscar uma unica estufa
const getOneMushroom = async (req, res) => {
  try {
    if (ObjectId.isValid(req.params.id)) {
      const id = req.params.id;
      const mushroom = await mushroomService.getOne(id);
      if (!mushroom) {
        res.sendStatus(404);
      } else {
        res.status(200).json({ mushroom });
      }
    } else {
      res.sendStatus(400);
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

export default { getAllMushroom, createMushroom, deleteMushroom, updateMushroom, getOneMushroom}