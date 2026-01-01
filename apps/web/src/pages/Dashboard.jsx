import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { getDashboard } from "../api/dashboard";
import KpiCard from "../components/ui/KpiCard";
import { FiPackage, FiUserCheck, FiDollarSign, FiNavigation } from "react-icons/fi";

function fmtMoney(n) {
  try {
    return new Intl.NumberFormat(undefined, { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n ?? 0);
  } catch {
    return `$${n ?? 0}`;
  }
}

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setErr("");
    getDashboard()
      .then((d) => mounted && setData(d))
      .catch((e) => mounted && setErr(e?.message || "Failed to load dashboard"))
      .finally(() => mounted && setLoading(false));
    return () => { mounted = false; };
  }, []);

  const kpis = useMemo(() => {
    const activeLoads = data?.activeLoads ?? "—";
    const availableDrivers = data?.availableDrivers ?? "—";
    const revenueThisMonth = data ? fmtMoney(data?.revenueThisMonth) : "—";
    const tripsInProgress = data?.tripsInProgress ?? "—";
    return [
      { title: "Active Loads", value: activeLoads, icon: FiPackage },
      { title: "Available Drivers", value: availableDrivers, icon: FiUserCheck },
      { title: "Revenue This Month", value: revenueThisMonth, icon: FiDollarSign },
      { title: "Trips In Progress", value: tripsInProgress, icon: FiNavigation },
    ];
  }, [data]);

  return (
    <div style={{ maxWidth: 1180, margin: "0 auto" }}>
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 10, flexWrap: "wrap" }}>
        <div>
          <div style={{ color: "var(--muted)", fontSize: 12, letterSpacing: 0.4 }}>Dashboard</div>
          <h1 style={{ margin: "6px 0 0", fontSize: 22, fontWeight: 900 }}>Operations Overview</h1>
        </div>
        <div style={{ color: "var(--muted)", fontSize: 13 }}>
          API: <span style={{ color: "rgba(244,197,66,0.9)" }}>{import.meta.env.VITE_API_URL || "http://localhost:3000"}</span>
        </div>
      </div>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(12, 1fr)",
        gap: 14,
        marginTop: 14
      }}>
        {kpis.map((k) => (
          <div key={k.title} style={{ gridColumn: "span 3" }} className="kpi-col">
            <KpiCard title={k.title} value={k.value} icon={k.icon} />
          </div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.35, delay: 0.1 }}
        className="glass"
        style={{ marginTop: 14, padding: 16, borderRadius: 22 }}
      >
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 10, flexWrap: "wrap" }}>
          <div style={{ fontWeight: 850 }}>Status</div>
          <div style={{ color: "var(--muted)", fontSize: 13 }}>
            {loading ? "Loading..." : err ? "Error" : "Live"}
          </div>
        </div>

        <hr className="hr" />

        {loading ? (
          <div style={{ color: "var(--muted)" }}>Fetching KPIs from <b>/dashboard</b>...</div>
        ) : err ? (
          <div style={{ color: "rgba(255,160,160,0.95)" }}>
            {err}
            <div style={{ marginTop: 8, color: "var(--muted)" }}>
              Asegúrate de que tu backend esté corriendo y que <code>VITE_API_URL</code> esté configurado.
            </div>
          </div>
        ) : (
          <div style={{ color: "var(--muted)", lineHeight: 1.65 }}>
            KPIs loaded successfully. Next step: implement tables + filters + pagination per module.
          </div>
        )}
      </motion.div>

      <style>{`
        @media (max-width: 1100px){
          .kpi-col{ grid-column: span 6 !important; }
        }
        @media (max-width: 640px){
          .kpi-col{ grid-column: span 12 !important; }
        }
      `}</style>
    </div>
  );
}
