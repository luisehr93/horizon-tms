import { DriverModel } from "../models/driverModel.js";

export const getDrivers = async (req, res) => {
  try {
    const drivers = await DriverModel.getAll();
    res.json(drivers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createDriver = async (req, res) => {
  try {
    const newDriver = await DriverModel.create(req.body);
    res.json(newDriver);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};