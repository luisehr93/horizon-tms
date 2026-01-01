import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Card from "../components/ui/Card";
import {
  FiUsers, FiUserCheck, FiTruck, FiPackage, FiNavigation, FiFileText, FiArrowRight
} from "react-icons/fi";

const tiles = [
  { to: "/app/clients", title: "Clients", desc: "Manage shippers & brokers", icon: FiUsers },
  { to: "/app/drivers", title: "Drivers", desc: "Availability, status, documents", icon: FiUserCheck },
  { to: "/app/trucks", title: "Trucks", desc: "Units, maintenance status", icon: FiTruck },
  { to: "/app/loads", title: "Loads", desc: "Load lifecycle & documents", icon: FiPackage },
  { to: "/app/trips", title: "Trips", desc: "Dispatch & trip execution", icon: FiNavigation },
  { to: "/app/invoices", title: "Invoices", desc: "Billing & collections", icon: FiFileText },
];

export default function Landing() {
  return (
    <div style={{ minHeight: "100vh", padding: "54px 0 70px" }}>
      <div className="container">
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 18, flexWrap: "wrap" }}>
          <div style={{ maxWidth: 720 }}>
            <div className="badge">Horizon Truck Line LLC</div>
            <h1 style={{ margin: "14px 0 10px", fontSize: 44, lineHeight: 1.06, letterSpacing: -0.7 }}>
              Horizon TMS
              <span style={{ color: "var(--gold-500)" }}>.</span>
            </h1>
            <p style={{ margin: 0, color: "var(--muted)", fontSize: 16, lineHeight: 1.6 }}>
              Corporate-grade Transportation Management System. Dispatch, loads, trips and billing in one clean platform.
            </p>

            <div style={{ display: "flex", gap: 12, marginTop: 18, flexWrap: "wrap" }}>
              <Link
                to="/app/dashboard"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                  height: 44,
                  padding: "0 14px",
                  borderRadius: 16,
                  border: "1px solid rgba(244,197,66,0.32)",
                  background: "rgba(244,197,66,0.14)",
                  color: "var(--text)",
                  fontWeight: 800
                }}
              >
                Enter Dashboard <FiArrowRight />
              </Link>

              <a
                href="#modules"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                  height: 44,
                  padding: "0 14px",
                  borderRadius: 16,
                  border: "1px solid rgba(255,255,255,0.14)",
                  background: "rgba(255,255,255,0.05)",
                  color: "var(--text)",
                  fontWeight: 700
                }}
              >
                Explore Modules
              </a>
            </div>
          </div>

          <div className="glass-strong" style={{ padding: 18, borderRadius: 22, minWidth: 280 }}>
            <div style={{ fontSize: 12, color: "var(--muted)" }}>Status</div>
            <div style={{ fontSize: 18, fontWeight: 850, marginTop: 6 }}>System UI Ready</div>
            <hr className="hr" />
            <div style={{ display: "grid", gap: 10 }}>
              <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
                <span style={{ color: "var(--muted)" }}>Theme</span>
                <span style={{ fontWeight: 750 }}>Corporate Navy/Gold</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
                <span style={{ color: "var(--muted)" }}>Modules</span>
                <span style={{ fontWeight: 750 }}>Ready to extend</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
                <span style={{ color: "var(--muted)" }}>Dashboard</span>
                <span style={{ fontWeight: 750 }}>API-driven</span>
              </div>
            </div>
          </div>
        </div>

        <div id="modules" style={{ marginTop: 28 }}>
          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 10, flexWrap: "wrap" }}>
            <h2 style={{ margin: 0, fontSize: 18, letterSpacing: 0.2 }}>Modules</h2>
            <div style={{ color: "var(--muted)", fontSize: 13 }}>Clean UI base for a commercial TMS</div>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(12, 1fr)",
            gap: 14,
            marginTop: 14
          }}>
            {tiles.map(({ to, title, desc, icon: Icon }, idx) => (
              <motion.div
                key={to}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.04 * idx }}
                style={{ gridColumn: "span 4" }}
                className="tile-col"
              >
                <Link to={to}>
                  <Card className="tile">
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
                      <div style={{
                        width: 44,
                        height: 44,
                        borderRadius: 16,
                        background: "rgba(255,255,255,0.05)",
                        border: "1px solid rgba(255,255,255,0.08)",
                        display: "grid",
                        placeItems: "center"
                      }}>
                        <Icon size={20} style={{ color: "var(--gold-500)" }} />
                      </div>
                      <FiArrowRight style={{ color: "rgba(244,197,66,0.75)" }} />
                    </div>

                    <div style={{ marginTop: 12, fontWeight: 850, fontSize: 16 }}>{title}</div>
                    <div style={{ marginTop: 6, color: "var(--muted)", fontSize: 13, lineHeight: 1.5 }}>{desc}</div>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .tile{ padding: 16px; border-radius: 22px; }
        .tile:hover{
          border-color: rgba(244,197,66,0.28);
          box-shadow: var(--ring);
          transform: translateY(-1px);
          transition: all 140ms ease;
        }
        .kpi-card{ padding: 16px; border-radius: 22px; }
        @media (max-width: 1000px){
          .tile-col{ grid-column: span 6 !important; }
        }
        @media (max-width: 640px){
          .tile-col{ grid-column: span 12 !important; }
        }
      `}</style>
    </div>
  );
}
