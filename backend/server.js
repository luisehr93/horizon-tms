import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import loadRoutes from "./src/routes/loadRoutes.js";
import clientRoutes from "./src/routes/clientRoutes.js";
import driverRoutes from "./src/routes/driverRoutes.js";
import truckRoutes from "./src/routes/truckRoutes.js";
import tripRoutes from "./src/routes/tripRoutes.js";
import documentRoutes from "./src/routes/documentRoutes.js";
import invoiceRoutes from "./src/routes/invoiceRoutes.js";

app.use("/api/invoices", invoiceRoutes);
app.use("/api/documents", documentRoutes);
app.use("/api/trips", tripRoutes);
app.use("/api/trucks", truckRoutes);
app.use("/api/drivers", driverRoutes);
app.use("/api/clients", clientRoutes);
dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/loads", loadRoutes);

app.listen(4000, () => {
  console.log("TMS Backend running on port 4000");
});
