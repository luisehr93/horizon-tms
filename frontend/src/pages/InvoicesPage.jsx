import { useEffect, useState } from "react";
import invoiceService from "../services/invoiceService";
import loadService from "../services/loadService";

export default function InvoicesPage() {
  const [invoices, setInvoices] = useState([]);
  const [loads, setLoads] = useState([]);

  const [form, setForm] = useState({
    load_id: "",
    amount: "",
    issue_date: "",
    due_date: "",
    status: "",
    pdf_url: ""
  });

  useEffect(() => {
    invoiceService.getInvoices().then(res => setInvoices(res.data));
    loadService.getLoads().then(res => setLoads(res.data));
  }, []);

  const handleSubmit = e => {
    e.preventDefault();
    invoiceService.createInvoice(form).then(() => {
      invoiceService.getInvoices().then(res => setInvoices(res.data));
      setForm({
        load_id: "",
        amount: "",
        issue_date: "",
        due_date: "",
        status: "",
        pdf_url: ""
      });
    });
  };

  return (
    <div>
      <h1>Invoices</h1>

      <form onSubmit={handleSubmit}>
        <select
          value={form.load_id}
          onChange={e => setForm({ ...form, load_id: e.target.value })}
        >
          <option value="">Select Load</option>
          {loads.map(l => (
            <option key={l.id} value={l.id}>
              Load #{l.id} — {l.origin_city} → {l.destination_city}
            </option>
          ))}
        </select>

        <input
          placeholder="Amount"
          value={form.amount}
          onChange={e => setForm({ ...form, amount: e.target.value })}
        />

        <input
          type="date"
          value={form.issue_date}
          onChange={e => setForm({ ...form, issue_date: e.target.value })}
        />

        <input
          type="date"
          value={form.due_date}
          onChange={e => setForm({ ...form, due_date: e.target.value })}
        />

        <input
          placeholder="Status (Pending / Sent / Paid)"
          value={form.status}
          onChange={e => setForm({ ...form, status: e.target.value })}
        />

        <input
          placeholder="PDF URL"
          value={form.pdf_url}
          onChange={e => setForm({ ...form, pdf_url: e.target.value })}
        />

        <button type="submit">Add Invoice</button>
      </form>

      <table>
        <thead>
          <tr>
            <th>Client</th>
            <th>Load</th>
            <th>Amount</th>
            <th>Issue</th>
            <th>Due</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map(inv => (
            <tr key={inv.id}>
              <td>{inv.client_name}</td>
              <td>{inv.origin_city} → {inv.destination_city}</td>
              <td>${inv.amount}</td>
              <td>{inv.issue_date}</td>
              <td>{inv.due_date}</td>
              <td>{inv.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}