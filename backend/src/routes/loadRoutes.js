import express from "express";
import { getLoads, createLoad } from "../controllers/loadController.js";

const router = express.Router();

router.get("/", getLoads);
router.post("/", createLoad);

export default router;