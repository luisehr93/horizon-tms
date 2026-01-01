import React from "react";
import { NavLink } from "react-router-dom";
import {
  FiGrid, FiUsers, FiUserCheck, FiTruck, FiPackage, FiNavigation, FiFileText
} from "react-icons/fi";

const nav = [
  { to: "/app/dashboard", label: "Dashboard", icon: FiGrid },
  { to: "/app/clients", label: "Clients", icon: FiUsers },
  { to: "/app/drivers", label: "Drivers", icon: FiUserCheck },
  { to: "/app/trucks", label: "Trucks", icon: FiTruck },
  { to: "/app/loads", label: "Loads", icon: FiPackage },
  { to: "/app/trips", label: "Trips", icon: FiNavigation },
  { to: "/app/invoices", label: "Invoices", icon: FiFileText },
];

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: "10px 10px 12px 10px",
          borderRadius: 16,
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.06)"
        }}>
          <div style={{
            width: 38,
            height: 38,
            borderRadius: 14,
            background: "rgba(244,197,66,0.12)",
            border: "1px solid rgba(244,197,66,0.22)",
            display: "grid",
            placeItems: "center",
            color: "var(--gold-500)",
            fontWeight: 900
          }}>
            H
          </div>
          <div style={{ lineHeight: 1.1, overflow: "hidden" }}>
            <div style={{ fontWeight: 800, fontSize: 14, whiteSpace: "nowrap", textOverflow: "ellipsis", overflow: "hidden" }}>
              Horizon TMS
            </div>
            <div style={{ fontSize: 12, color: "var(--muted)", whiteSpace: "nowrap", textOverflow: "ellipsis", overflow: "hidden" }}>
              Horizon Truck Line LLC
            </div>
          </div>
        </div>

        <div style={{ marginTop: 14, display: "flex", flexDirection: "column", gap: 6 }}>
          {nav.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              style={({ isActive }) => ({
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "10px 12px",
                borderRadius: 14,
                border: "1px solid rgba(255,255,255,0.06)",
                background: isActive ? "rgba(244,197,66,0.10)" : "rgba(255,255,255,0.03)",
                color: isActive ? "var(--gold-500)" : "var(--text)",
                transition: "all 140ms ease",
                outline: "none"
              })}
              className="sidebar-link"
            >
              <span style={{ width: 22, display: "grid", placeItems: "center" }}>
                <Icon size={18} />
              </span>
              <span className="sidebar-label" style={{ fontWeight: 650 }}>{label}</span>
            </NavLink>
          ))}
        </div>

        <div style={{ marginTop: "auto", padding: 10, borderRadius: 16, border: "1px solid rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.03)" }}>
          <div style={{ fontSize: 12, color: "var(--muted)" }}>Build</div>
          <div style={{ fontSize: 13, fontWeight: 700 }}>Horizon TMS UI</div>
        </div>
      </div>

      <style>{`
        .sidebar-link:hover{
          border-color: rgba(244,197,66,0.28) !important;
          box-shadow: var(--ring);
        }
        @media (max-width: 900px){
          .sidebar-label{ display:none; }
        }
      `}</style>
    </aside>
  );
}
