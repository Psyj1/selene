import mushroomService from "../services/mushroomService.js";
import { ObjectId } from "mongodb";

const getAllMushroom = async (req, res) => {
  try {
    const mushrooms = await mushroomService.getAll();
    res.status(200).json(mushrooms);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error." });
  }
};

// CORRIGIDO: Usando todos os campos da fazenda
const createMushroom = async (req, res) => {
  try {
    const {
      nome, rua, bairro, numero, cidade, estado, foco_producao,
      area_total, area_cultivo, tipo_terreno, numero_estufas,
      capacidade_producao, numero_compostos, status_operacional,
      responsavel, telefone_responsavel, email_responsavel, cnpj
    } = req.body;
    
    const newMushroom = await mushroomService.Create(
      nome, rua, bairro, numero, cidade, estado, foco_producao,
      area_total, area_cultivo, tipo_terreno, numero_estufas,
      capacidade_producao, numero_compostos, status_operacional,
      responsavel, telefone_responsavel, email_responsavel, cnpj
    );
    
    res.status(201).json(newMushroom);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error." });
  }
};

const deleteMushroom = async (req, res) => {
  try {
    if (ObjectId.isValid(req.params.id)) {
      const id = req.params.id;
      await mushroomService.Delete(id);
      res.sendStatus(204);
    } else {
      res.status(400).json({ error: "ID inválido" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error." });
  }
};

// CORRIGIDO: Update simplificado
const updateMushroom = async (req, res) => {
  try {
    if (ObjectId.isValid(req.params.id)) {
      const id = req.params.id;
      const updateData = req.body;
      const updatedMushroom = await mushroomService.Update(id, updateData);
      res.status(200).json(updatedMushroom);
    } else {
      res.status(400).json({ error: "ID inválido" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error." });
  }
};

const getOneMushroom = async (req, res) => {
  try {
    if (ObjectId.isValid(req.params.id)) {
      const id = req.params.id;
      const mushroom = await mushroomService.getOne(id);
      if (!mushroom) {
        res.status(404).json({ error: "Fazenda não encontrada" });
      } else {
        res.status(200).json(mushroom);
      }
    } else {
      res.status(400).json({ error: "ID inválido" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error." });
  }
};

export default { getAllMushroom, createMushroom, deleteMushroom, updateMushroom, getOneMushroom };