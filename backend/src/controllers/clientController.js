import { ClientModel } from "../models/clientModel.js";

export const getClients = async (req, res) => {
  try {
    const clients = await ClientModel.getAll();
    res.json(clients);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createClient = async (req, res) => {
  try {
    const newClient = await ClientModel.create(req.body);
    res.json(newClient);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};