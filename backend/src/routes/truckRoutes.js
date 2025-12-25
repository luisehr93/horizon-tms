import express from "express";
import { getTrucks, createTruck } from "../controllers/truckController.js";

const router = express.Router();

router.get("/", getTrucks);
router.post("/", createTruck);

export default router;