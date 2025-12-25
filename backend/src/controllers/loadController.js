import { LoadModel } from "../models/loadModel.js";

export const getLoads = async (req, res) => {
  try {
    const loads = await LoadModel.getAll();
    res.json(loads);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createLoad = async (req, res) => {
  try {
    const newLoad = await LoadModel.create(req.body);
    res.json(newLoad);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};