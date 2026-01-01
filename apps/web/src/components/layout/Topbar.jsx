import React, { useMemo, useState } from "react";
import { FiBell } from "react-icons/fi";

export default function Topbar() {
  const [lang, setLang] = useState("EN");

  // Simulación de usuario (luego vendrá del backend/auth)
  const user = useMemo(() => ({ name: "Luis", initial: "L" }), []);

  return (
    <header className="topbar">
      <div style={{ display: "flex", alignItems: "center", gap: 12, width: "100%" }}>
        <div style={{ fontWeight: 850, letterSpacing: 0.2 }}>
          Horizon TMS
          <span style={{ marginLeft: 10, color: "var(--muted)", fontWeight: 650, fontSize: 12 }}>
            Transportation Management System
          </span>
        </div>

        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 12 }}>
          <button
            type="button"
            aria-label="Notifications"
            style={{
              width: 38,
              height: 38,
              borderRadius: 14,
              border: "1px solid rgba(255,255,255,0.10)",
              background: "rgba(255,255,255,0.04)",
              color: "var(--text)",
              display: "grid",
              placeItems: "center",
              cursor: "pointer"
            }}
          >
            <FiBell size={18} />
          </button>

          <select
            value={lang}
            onChange={(e) => setLang(e.target.value)}
            aria-label="Language"
            style={{
              height: 38,
              borderRadius: 14,
              border: "1px solid rgba(255,255,255,0.10)",
              background: "rgba(255,255,255,0.04)",
              color: "var(--text)",
              padding: "0 10px",
              cursor: "pointer"
            }}
          >
            <option value="EN">EN</option>
            <option value="ES">ES</option>
          </select>

          <div style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: "6px 10px",
            borderRadius: 16,
            border: "1px solid rgba(255,255,255,0.10)",
            background: "rgba(255,255,255,0.04)"
          }}>
            <div style={{
              width: 34,
              height: 34,
              borderRadius: 14,
              background: "rgba(244,197,66,0.12)",
              border: "1px solid rgba(244,197,66,0.22)",
              display: "grid",
              placeItems: "center",
              color: "var(--gold-500)",
              fontWeight: 900
            }}>
              {user.initial}
            </div>
            <div style={{ lineHeight: 1.1 }}>
              <div style={{ fontWeight: 750, fontSize: 13 }}>{user.name}</div>
              <div style={{ fontSize: 11, color: "var(--muted)" }}>Dispatcher</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
