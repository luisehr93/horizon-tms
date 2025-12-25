import React from "react";
import "./Home.css";

export default function Home() {
  const modules = [
    { title: "Clients", desc: "Manage customers and accounts", path: "/clients" },
    { title: "Drivers", desc: "Driver profiles and documents", path: "/drivers" },
    { title: "Trucks", desc: "Fleet management and equipment", path: "/trucks" },
    { title: "Loads", desc: "Create and track loads", path: "/loads" },
    { title: "Trips", desc: "Assign loads and dispatch", path: "/trips" },
    { title: "Invoices", desc: "Billing and financial reports", path: "/invoices" }
  ];

  return (
    <div className="home-wrapper">
      <header className="home-header">
        <h1>Horizon Truck Line LLC</h1>
        <p className="subtitle">Transportation Management System</p>
      </header>

      <div className="modules-grid">
        {modules.map((m) => (
          <div
            key={m.title}
            className="module-card"
            onClick={() => (window.location.href = m.path)}
          >
            <h3>{m.title}</h3>
            <p>{m.desc}</p>
          </div>
        ))}
      </div>

      <footer className="home-footer">
        © 2025 Horizon Truck Line LLC – All Rights Reserved
      </footer>
    </div>
  );
}