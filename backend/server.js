import express from "express";
import cors from "cors";
import db from "./src/config/db.js";

import clientRoutes from "./src/routes/clientRoutes.js";
import driverRoutes from "./src/routes/driverRoutes.js";
import truckRoutes from "./src/routes/truckRoutes.js";
import loadRoutes from "./src/routes/loadRoutes.js";
import tripRoutes from "./src/routes/tripRoutes.js";
import documentRoutes from "./src/routes/documentRoutes.js";
import invoiceRoutes from "./src/routes/invoiceRoutes.js";
import dashboardRoutes from "./src/routes/dashboardRoutes.js";

const app = express();   // ← ESTA LÍNEA DEBE IR ARRIBA

app.use(cors());
app.use(express.json());

// RUTAS (después de crear app)
app.use("/api/clients", clientRoutes);
app.use("/api/drivers", driverRoutes);
app.use("/api/trucks", truckRoutes);
app.use("/api/loads", loadRoutes);
app.use("/api/trips", tripRoutes);
app.use("/api/documents", documentRoutes);
app.use("/api/invoices", invoiceRoutes);
app.use("/api/dashboard", dashboardRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
