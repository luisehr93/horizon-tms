import React, { useEffect, useMemo, useState } from "react";
import { FaSearch, FaPlus, FaPencilAlt, FaTrash } from "react-icons/fa";
import Card from "../components/ui/Card";
import { listDrivers, createDriver, updateDriver, deleteDriver } from "../api/drivers";

const emptyForm = {
  name: "",
  phone: "",
  email: "",
  licenseNumber: "",
  state: "",
  notes: "",
  isAvailable: true,
  isActive: true,
};

function Modal({ open, title, children, onClose }) {
  if (!open) return null;
  return (
    <div style={styles.backdrop} onClick={onClose}>
      <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div style={styles.modalHeader}>
          <div style={styles.modalTitle}>{title}</div>
          <button style={styles.iconBtn} onClick={onClose}>✕</button>
        </div>
        <div style={{ marginTop: 12 }}>{children}</div>
      </div>
    </div>
  );
}

export default function Drivers() {
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);

  const [search, setSearch] = useState("");
  const [isActive, setIsActive] = useState("");
  const [isAvailable, setIsAvailable] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);

  const totalPages = useMemo(() => Math.max(1, Math.ceil(total / pageSize)), [total]);

  async function load() {
    setLoading(true);
    setErr("");
    try {
      const res = await listDrivers({ search, isActive, isAvailable, page, pageSize });
      setData(res.data);
      setTotal(res.total);
    } catch (e) {
      setErr(e?.message || "Error loading drivers");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); /* eslint-disable-next-line */ }, [search, isActive, isAvailable, page]);

  function openCreate() {
    setEditing(null);
    setForm(emptyForm);
    setModalOpen(true);
  }

  function openEdit(row) {
    setEditing(row);
    setForm({
      name: row.name ?? "",
      phone: row.phone ?? "",
      email: row.email ?? "",
      licenseNumber: row.licenseNumber ?? "",
      state: row.state ?? "",
      notes: row.notes ?? "",
      isAvailable: !!row.isAvailable,
      isActive: !!row.isActive,
    });
    setModalOpen(true);
  }

  async function onSave(e) {
    e.preventDefault();
    setErr("");
    try {
      if (!form.name.trim()) return setErr("Name is required");
      if (editing) await updateDriver(editing.id, form);
      else await createDriver(form);
      setModalOpen(false);
      await load();
    } catch (e2) {
      setErr(e2?.message || "Save failed");
    }
  }

  async function onDelete(row) {
    const ok = confirm(`Delete driver "${row.name}"?`);
    if (!ok) return;
    try {
      await deleteDriver(row.id);
      await load();
    } catch (e) {
      alert(e?.message || "Delete failed");
    }
  }

  return (
    <div style={{ display: "grid", gap: 16 }}>
      <div style={styles.headerRow}>
        <div>
          <div style={styles.h1}>Drivers</div>
          <div style={styles.sub}>Manage drivers, availability and contact details.</div>
        </div>
        <button style={styles.primaryBtn} onClick={openCreate}>
          <FaPlus /> New Driver
        </button>
      </div>

      <Card>
        <div style={styles.toolbar}>
          <div style={styles.searchWrap}>
            <FaSearch />
            <input
              value={search}
              onChange={(e) => { setPage(1); setSearch(e.target.value); }}
              placeholder="Search name, phone, email, license..."
              style={styles.search}
            />
          </div>

          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <select value={isActive} onChange={(e) => { setPage(1); setIsActive(e.target.value); }} style={styles.select}>
              <option value="">All</option>
              <option value="true">Active</option>
              <option value="false">Inactive</option>
            </select>

            <select value={isAvailable} onChange={(e) => { setPage(1); setIsAvailable(e.target.value); }} style={styles.select}>
              <option value="">All</option>
              <option value="true">Available</option>
              <option value="false">Unavailable</option>
            </select>
          </div>
        </div>

        {err && <div style={styles.error}>{err}</div>}

        <div style={styles.tableWrap}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Phone</th>
                <th>Email</th>
                <th>License</th>
                <th>State</th>
                <th>Active</th>
                <th>Available</th>
                <th style={{ width: 140 }}></th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={8} style={styles.tdMuted}>Loading...</td></tr>
              ) : data.length === 0 ? (
                <tr><td colSpan={8} style={styles.tdMuted}>No drivers found.</td></tr>
              ) : (
                data.map((d) => (
                  <tr key={d.id}>
                    <td style={{ fontWeight: 700 }}>{d.name}</td>
                    <td>{d.phone || "-"}</td>
                    <td>{d.email || "-"}</td>
                    <td>{d.licenseNumber || "-"}</td>
                    <td>{d.state || "-"}</td>
                    <td><span style={d.isActive ? styles.badgeOn : styles.badgeOff}>{d.isActive ? "Active" : "Inactive"}</span></td>
                    <td><span style={d.isAvailable ? styles.badgeGold : styles.badgeOff}>{d.isAvailable ? "Available" : "Unavailable"}</span></td>
                    <td style={{ textAlign: "right" }}>
                      <button style={styles.smallBtn} onClick={() => openEdit(d)} title="Edit"><FaPencilAlt /></button>
                      <button style={styles.smallBtnDanger} onClick={() => onDelete(d)} title="Delete"><FaTrash /></button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div style={styles.pager}>
          <div style={{ opacity: 0.85 }}>
            Page <b>{page}</b> of <b>{totalPages}</b> • Total <b>{total}</b>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button disabled={page <= 1} style={styles.pagerBtn} onClick={() => setPage((p) => p - 1)}>Prev</button>
            <button disabled={page >= totalPages} style={styles.pagerBtn} onClick={() => setPage((p) => p + 1)}>Next</button>
          </div>
        </div>
      </Card>

      <Modal open={modalOpen} title={editing ? "Edit Driver" : "New Driver"} onClose={() => setModalOpen(false)}>
        <form onSubmit={onSave} style={{ display: "grid", gap: 10 }}>
          <div style={styles.grid2}>
            <label style={styles.label}>
              Name *
              <input style={styles.input} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </label>
            <label style={styles.label}>
              Phone
              <input style={styles.input} value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
            </label>
          </div>

          <div style={styles.grid2}>
            <label style={styles.label}>
              Email
              <input style={styles.input} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            </label>
            <label style={styles.label}>
              License #
              <input style={styles.input} value={form.licenseNumber} onChange={(e) => setForm({ ...form, licenseNumber: e.target.value })} />
            </label>
          </div>

          <div style={styles.grid2}>
            <label style={styles.label}>
              State
              <input style={styles.input} value={form.state} onChange={(e) => setForm({ ...form, state: e.target.value })} />
            </label>
            <label style={styles.label}>
              Notes
              <input style={styles.input} value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} />
            </label>
          </div>

          <div style={{ display: "flex", gap: 18, flexWrap: "wrap" }}>
            <label style={styles.check}>
              <input type="checkbox" checked={form.isActive} onChange={(e) => setForm({ ...form, isActive: e.target.checked })} />
              Active
            </label>
            <label style={styles.check}>
              <input type="checkbox" checked={form.isAvailable} onChange={(e) => setForm({ ...form, isAvailable: e.target.checked })} />
              Available
            </label>
          </div>

          <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 6 }}>
            <button type="button" style={styles.secondaryBtn} onClick={() => setModalOpen(false)}>Cancel</button>
            <button type="submit" style={styles.primaryBtn}>Save</button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

const styles = {
  h1: { fontSize: 22, fontWeight: 800, color: "white" },
  sub: { marginTop: 4, opacity: 0.8, color: "white" },
  headerRow: { display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, flexWrap: "wrap" },

  toolbar: { display: "flex", gap: 12, alignItems: "center", justifyContent: "space-between", flexWrap: "wrap" },
  searchWrap: {
    display: "flex", gap: 10, alignItems: "center",
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.10)",
    borderRadius: 12, padding: "10px 12px",
    minWidth: 280, color: "rgba(255,255,255,0.75)",
  },
  search: { width: "100%", outline: "none", border: "none", background: "transparent", color: "white" },
  select: {
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.10)",
    borderRadius: 12, padding: "10px 12px",
    color: "white", outline: "none",
  },

  tableWrap: { marginTop: 12, overflowX: "auto" },
  table: { width: "100%", borderCollapse: "collapse", color: "white" },
  tdMuted: { padding: 14, opacity: 0.7, color: "white" },

  badgeOn: {
    padding: "4px 10px", borderRadius: 999,
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.12)",
    color: "rgba(255,255,255,0.9)",
    fontWeight: 800, fontSize: 12,
  },
  badgeGold: {
    padding: "4px 10px", borderRadius: 999,
    background: "rgba(244,197,66,0.15)",
    border: "1px solid rgba(244,197,66,0.35)",
    color: "#F4C542",
    fontWeight: 900, fontSize: 12,
  },
  badgeOff: {
    padding: "4px 10px", borderRadius: 999,
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.10)",
    color: "rgba(255,255,255,0.7)",
    fontWeight: 800, fontSize: 12,
  },

  pager: { display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 14, gap: 10, flexWrap: "wrap", color: "white" },
  pagerBtn: { padding: "8px 12px", borderRadius: 10, border: "1px solid rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.06)", color: "white", cursor: "pointer" },

  primaryBtn: { display: "inline-flex", gap: 8, alignItems: "center", padding: "10px 14px", borderRadius: 12, border: "1px solid rgba(244,197,66,0.35)", background: "rgba(244,197,66,0.15)", color: "#F4C542", fontWeight: 900, cursor: "pointer" },
  secondaryBtn: { padding: "10px 14px", borderRadius: 12, border: "1px solid rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.06)", color: "white", cursor: "pointer" },

  smallBtn: { marginRight: 8, padding: "8px 10px", borderRadius: 10, border: "1px solid rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.06)", color: "white", cursor: "pointer" },
  smallBtnDanger: { padding: "8px 10px", borderRadius: 10, border: "1px solid rgba(255,80,80,0.35)", background: "rgba(255,80,80,0.12)", color: "white", cursor: "pointer" },

  error: { marginTop: 12, padding: 12, borderRadius: 12, border: "1px solid rgba(255,80,80,0.35)", background: "rgba(255,80,80,0.12)", color: "white" },

  backdrop: { position: "fixed", inset: 0, background: "rgba(0,0,0,0.55)", display: "grid", placeItems: "center", padding: 16, zIndex: 50 },
  modal: { width: "min(720px, 100%)", borderRadius: 16, border: "1px solid rgba(255,255,255,0.12)", background: "#0A0F24", padding: 16, color: "white" },
  modalHeader: { display: "flex", justifyContent: "space-between", alignItems: "center" },
  modalTitle: { fontSize: 16, fontWeight: 900 },
  iconBtn: { border: "none", background: "transparent", color: "rgba(255,255,255,0.8)", cursor: "pointer", fontSize: 18 },

  label: { display: "grid", gap: 6, fontSize: 12, opacity: 0.9, color: "white" },
  input: { padding: "10px 12px", borderRadius: 12, border: "1px solid rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.06)", color: "white", outline: "none" },
  grid2: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 },
  check: { display: "flex", gap: 10, alignItems: "center", color: "white", opacity: 0.9 },
};
