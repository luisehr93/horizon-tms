import { TripModel } from "../models/tripModel.js";

export const getTrips = async (req, res) => {
  try {
    const trips = await TripModel.getAll();
    res.json(trips);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createTrip = async (req, res) => {
  try {
    const newTrip = await TripModel.create(req.body);
    res.json(newTrip);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};