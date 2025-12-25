import express from "express";
import { getTrips, createTrip } from "../controllers/tripController.js";

const router = express.Router();

router.get("/", getTrips);
router.post("/", createTrip);

export default router;