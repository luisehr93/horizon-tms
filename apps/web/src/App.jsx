import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Landing from "./pages/Landing.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import PlaceholderModule from "./pages/PlaceholderModule.jsx";
import AppLayout from "./components/layout/AppLayout.jsx";
import Clients from "./pages/Clients.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />

      <Route element={<AppLayout />}>
        <Route path="/app" element={<Navigate to="/app/dashboard" replace />} />
        <Route path="/app/dashboard" element={<Dashboard />} />

        <Route path="/app/clients" element={<Clients />} />
        <Route path="/app/drivers" element={<PlaceholderModule title="Drivers" />} />
        <Route path="/app/trucks" element={<PlaceholderModule title="Trucks" />} />
        <Route path="/app/loads" element={<PlaceholderModule title="Loads" />} />
        <Route path="/app/trips" element={<PlaceholderModule title="Trips" />} />
        <Route path="/app/invoices" element={<PlaceholderModule title="Invoices" />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
