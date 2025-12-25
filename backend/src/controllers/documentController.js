import { DocumentModel } from "../models/documentModel.js";

export const getDocuments = async (req, res) => {
  try {
    const docs = await DocumentModel.getAll();
    res.json(docs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createDocument = async (req, res) => {
  try {
    const newDoc = await DocumentModel.create(req.body);
    res.json(newDoc);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};