import React, { useEffect, useMemo, useState } from "react";
import { FaSearch, FaPlus, FaPencilAlt, FaTrash } from "react-icons/fa";
import Card from "../components/ui/Card";
import { listClients, createClient, updateClient, deleteClient } from "../api/clients";

const emptyForm = {
  name: "",
  mcNumber: "",
  dotNumber: "",
  phone: "",
  email: "",
  billingEmail: "",
  address: "",
  notes: "",
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

export default function Clients() {
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);

  const [search, setSearch] = useState("");
  const [isActive, setIsActive] = useState(""); // "", "true", "false"
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [modalErr, setModalErr] = useState("");

  const totalPages = useMemo(() => Math.max(1, Math.ceil(total / pageSize)), [total, pageSize]);

  async function load() {
    setLoading(true);
    setErr("");
    try {
      const res = await listClients({ search, isActive, page, pageSize });
      setData(res.data);
      setTotal(res.total);
    } catch (e) {
      setErr(e?.message || "Error loading clients");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); /* eslint-disable-next-line */ }, [search, isActive, page]);

function openCreate() {
  setEditing(null);
  setForm(emptyForm);
  setModalErr("");
  setModalOpen(true);
}


  function openEdit(row) {
    setEditing(row);
    setForm({
      name: row.name ?? "",
      mcNumber: row.mcNumber ?? "",
      dotNumber: row.dotNumber ?? "",
      phone: row.phone ?? "",
      email: row.email ?? "",
      billingEmail: row.billingEmail ?? "",
      address: row.address ?? "",
      notes: row.notes ?? "",
      isActive: !!row.isActive,
    });
    setModalOpen(true);
    setModalErr("");
  }

 async function onSave(e) {
  e.preventDefault();
  setModalErr("");

  const name = (form.name || "").trim();
  if (!name) {
    setModalErr("Name is required");
    return;
  }

  setSaving(true);
  try {
    const payload = { ...form, name };

    if (editing) await updateClient(editing.id, payload);
    else await createClient(payload);

    setModalOpen(false);
    setEditing(null);
    setForm(emptyForm);

    await load();
  } catch (e2) {
    setModalErr(e2?.message || "Save failed");
  } finally {
    setSaving(false);
  }
}

  }

  async function onDelete(row) {
    const ok = confirm(`Delete client "${row.name}"?`);
    if (!ok) return;
    try {
      await deleteClient(row.id);
      await load();
    } catch (e) {
      alert(e?.message || "Delete failed");
    }
  }

  return (
    <div style={{ display: "grid", gap: 16 }}>
      <div style={styles.headerRow}>
        <div>
          <div style={styles.h1}>Clients</div>
          <div style={styles.sub}>Manage shippers / brokers and billing contacts.</div>
        </div>
        <button style={styles.primaryBtn} onClick={openCreate}>
          <FaPlus /> New Client
        </button>
      </div>

      <Card>
        <div style={styles.toolbar}>
          <div style={styles.searchWrap}>
            <FaSearch />
            <input
              value={search}
              onChange={(e) => { setPage(1); setSearch(e.target.value); }}
              placeholder="Search name, MC, DOT, email..."
              style={styles.search}
            />
          </div>

          <select
            value={isActive}
            onChange={(e) => { setPage(1); setIsActive(e.target.value); }}
            style={styles.select}
          >
            <option value="">All</option>
            <option value="true">Active</option>
            <option value="false">Inactive</option>
          </select>
        </div>

        {err && <div style={styles.error}>{err}</div>}

        <div style={styles.tableWrap}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th>Name</th>
                <th>MC</th>
                <th>DOT</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Status</th>
                <th style={{ width: 140 }}></th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={7} style={styles.tdMuted}>Loading...</td></tr>
              ) : data.length === 0 ? (
                <tr><td colSpan={7} style={styles.tdMuted}>No clients found.</td></tr>
              ) : (
                data.map((c) => (
                  <tr key={c.id}>
                    <td style={{ fontWeight: 600 }}>{c.name}</td>
                    <td>{c.mcNumber || "-"}</td>
                    <td>{c.dotNumber || "-"}</td>
                    <td>{c.email || c.billingEmail || "-"}</td>
                    <td>{c.phone || "-"}</td>
                    <td>
                      <span style={c.isActive ? styles.badgeOn : styles.badgeOff}>
                        {c.isActive ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td style={{ textAlign: "right" }}>
                      <button style={styles.smallBtn} onClick={() => openEdit(c)} title="Edit">
                        <FaPencilAlt />
                      </button>
                      <button style={styles.smallBtnDanger} onClick={() => onDelete(c)} title="Delete">
                        <FaTrash />
                      </button>
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
            <button disabled={page <= 1} style={styles.pagerBtn} onClick={() => setPage((p) => p - 1)}>
              Prev
            </button>
            <button disabled={page >= totalPages} style={styles.pagerBtn} onClick={() => setPage((p) => p + 1)}>
              Next
            </button>
          </div>
        </div>
      </Card>

      <Modal
        open={modalOpen}
        title={editing ? "Edit Client" : "New Client"}
        onClose={() => setModalOpen(false)}
      >
        <form onSubmit={onSave} style={{ display: "grid", gap: 10 }}>
          {modalErr ? ( 
            <div style={{ padding: 10, borderRadius: 12, background: "rgba(255,0,0,0.12)", border: "1px solid rgba(255,0,0,0.25)" }}>
              {modalErr}
            </div>
          ) : null}

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
              Billing Email
              <input style={styles.input} value={form.billingEmail} onChange={(e) => setForm({ ...form, billingEmail: e.target.value })} />
            </label>
          </div>

          <div style={styles.grid2}>
            <label style={styles.label}>
              MC Number
              <input style={styles.input} value={form.mcNumber} onChange={(e) => setForm({ ...form, mcNumber: e.target.value })} />
            </label>
            <label style={styles.label}>
              DOT Number
              <input style={styles.input} value={form.dotNumber} onChange={(e) => setForm({ ...form, dotNumber: e.target.value })} />
            </label>
          </div>

          <label style={styles.label}>
            Address
            <input style={styles.input} value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
          </label>

          <label style={styles.label}>
            Notes
            <textarea style={{ ...styles.input, height: 90 }} value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} />
          </label>

          <label style={{ ...styles.label, display: "flex", gap: 10, alignItems: "center" }}>
            <input
              type="checkbox"
              checked={form.isActive}
              onChange={(e) => setForm({ ...form, isActive: e.target.checked })}
            />
            Active
          </label>

          <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 6 }}>
            <button type="button" style={styles.secondaryBtn} onClick={() => setModalOpen(false)}>
              Cancel
            </button>
            <button type="submit" disabled={saving} style={styles.primaryBtn}>
              {saving ? "Saving..." : editing ? "Save Changes" : "Create Client"}
            </button>

            </button>
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
    display: "flex",
    gap: 10,
    alignItems: "center",
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.10)",
    borderRadius: 12,
    padding: "10px 12px",
    minWidth: 280,
    color: "rgba(255,255,255,0.75)",
  },
  search: { width: "100%", outline: "none", border: "none", background: "transparent", color: "white" },
  select: {
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.10)",
    borderRadius: 12,
    padding: "10px 12px",
    color: "white",
    outline: "none",
  },

  tableWrap: { marginTop: 12, overflowX: "auto" },
  table: { width: "100%", borderCollapse: "collapse" },
  tdMuted: { padding: 14, opacity: 0.7 },

  badgeOn: {
    padding: "4px 10px",
    borderRadius: 999,
    background: "rgba(244,197,66,0.15)",
    border: "1px solid rgba(244,197,66,0.35)",
    color: "#F4C542",
    fontWeight: 700,
    fontSize: 12,
  },
  badgeOff: {
    padding: "4px 10px",
    borderRadius: 999,
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.12)",
    color: "rgba(255,255,255,0.75)",
    fontWeight: 700,
    fontSize: 12,
  },

  pager: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 14,
    gap: 10,
    flexWrap: "wrap",
  },
  pagerBtn: {
    padding: "8px 12px",
    borderRadius: 10,
    border: "1px solid rgba(255,255,255,0.12)",
    background: "rgba(255,255,255,0.06)",
    color: "white",
    cursor: "pointer",
  },

  primaryBtn: {
    display: "inline-flex",
    gap: 8,
    alignItems: "center",
    padding: "10px 14px",
    borderRadius: 12,
    border: "1px solid rgba(244,197,66,0.35)",
    background: "rgba(244,197,66,0.15)",
    color: "#F4C542",
    fontWeight: 800,
    cursor: "pointer",
  },
  secondaryBtn: {
    padding: "10px 14px",
    borderRadius: 12,
    border: "1px solid rgba(255,255,255,0.12)",
    background: "rgba(255,255,255,0.06)",
    color: "white",
    cursor: "pointer",
  },
  smallBtn: {
    marginRight: 8,
    padding: "8px 10px",
    borderRadius: 10,
    border: "1px solid rgba(255,255,255,0.12)",
    background: "rgba(255,255,255,0.06)",
    color: "white",
    cursor: "pointer",
  },
  smallBtnDanger: {
    padding: "8px 10px",
    borderRadius: 10,
    border: "1px solid rgba(255,80,80,0.35)",
    background: "rgba(255,80,80,0.12)",
    color: "white",
    cursor: "pointer",
  },

  error: {
    marginTop: 12,
    padding: 12,
    borderRadius: 12,
    border: "1px solid rgba(255,80,80,0.35)",
    background: "rgba(255,80,80,0.12)",
    color: "white",
  },

  backdrop: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.55)",
    display: "grid",
    placeItems: "center",
    padding: 16,
    zIndex: 50,
  },
  modal: {
    width: "min(720px, 100%)",
    borderRadius: 16,
    border: "1px solid rgba(255,255,255,0.12)",
    background: "#0A0F24",
    padding: 16,
    color: "white",
  },
  modalHeader: { display: "flex", justifyContent: "space-between", alignItems: "center" },
  modalTitle: { fontSize: 16, fontWeight: 900 },
  iconBtn: {
    border: "none",
    background: "transparent",
    color: "rgba(255,255,255,0.8)",
    cursor: "pointer",
    fontSize: 18,
  },

  label: { display: "grid", gap: 6, fontSize: 12, opacity: 0.9 },
  input: {
    padding: "10px 12px",
    borderRadius: 12,
    border: "1px solid rgba(255,255,255,0.12)",
    background: "rgba(255,255,255,0.06)",
    color: "white",
    outline: "none",
  },
  grid2: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 },
};
