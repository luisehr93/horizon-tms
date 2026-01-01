import React from "react";

export default function PlaceholderModule({ title }) {
  return (
    <div style={{ maxWidth: 1180, margin: "0 auto" }}>
      <div style={{ color: "var(--muted)", fontSize: 12, letterSpacing: 0.4 }}>{title}</div>
      <h1 style={{ margin: "6px 0 0", fontSize: 22, fontWeight: 900 }}>{title}</h1>

      <div className="glass" style={{ marginTop: 14, padding: 16, borderRadius: 22 }}>
        <div style={{ fontWeight: 850 }}>Module scaffold</div>
        <hr className="hr" />
        <div style={{ color: "var(--muted)", lineHeight: 1.65 }}>
          Aquí irá la tabla profesional (búsqueda, filtros, paginación) y modales create/edit.
        </div>
      </div>
    </div>
  );
}
