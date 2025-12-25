import { TruckModel } from "../models/truckModel.js";

export const getTrucks = async (req, res) => {
  try {
    const trucks = await TruckModel.getAll();
    res.json(trucks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createTruck = async (req, res) => {
  try {
    const newTruck = await TruckModel.create(req.body);
    res.json(newTruck);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};