import React from "react";
import { motion } from "framer-motion";
import Card from "./Card";

export default function KpiCard({ title, value, icon: Icon }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
    >
      <Card className="kpi-card">
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
          <div>
            <div style={{ color: "var(--muted)", fontSize: 12, letterSpacing: 0.3 }}>{title}</div>
            <div style={{ fontSize: 28, fontWeight: 750, marginTop: 6 }}>{value}</div>
          </div>
          <div
            aria-hidden="true"
            style={{
              width: 44,
              height: 44,
              borderRadius: 14,
              display: "grid",
              placeItems: "center",
              border: "1px solid rgba(244,197,66,0.22)",
              background: "rgba(244,197,66,0.10)",
              color: "var(--gold-500)",
              flex: "0 0 auto"
            }}
          >
            {Icon ? <Icon size={20} /> : null}
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
