import { useEffect, useState } from "react";
import clientService from "../services/clientService";

export default function ClientsPage() {
  const [clients, setClients] = useState([]);
  const [form, setForm] = useState({
    name: "",
    contact_name: "",
    phone: "",
    email: "",
    address: "",
    payment_terms: "",
    notes: ""
  });

  useEffect(() => {
    loadClients();
  }, []);

  const loadClients = () => {
    clientService.getClients().then(res => setClients(res.data));
  };

  const handleSubmit = e => {
    e.preventDefault();
    clientService.createClient(form).then(() => {
      loadClients();
      setForm({
        name: "",
        contact_name: "",
        phone: "",
        email: "",
        address: "",
        payment_terms: "",
        notes: ""
      });
    });
  };

  return (
    <div>
      <h1>Clients</h1>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Client Name"
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
        />
        <input
          placeholder="Contact Name"
          value={form.contact_name}
          onChange={e => setForm({ ...form, contact_name: e.target.value })}
        />
        <input
          placeholder="Phone"
          value={form.phone}
          onChange={e => setForm({ ...form, phone: e.target.value })}
        />
        <input
          placeholder="Email"
          value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })}
        />
        <input
          placeholder="Address"
          value={form.address}
          onChange={e => setForm({ ...form, address: e.target.value })}
        />
        <input
          placeholder="Payment Terms"
          value={form.payment_terms}
          onChange={e => setForm({ ...form, payment_terms: e.target.value })}
        />
        <textarea
          placeholder="Notes"
          value={form.notes}
          onChange={e => setForm({ ...form, notes: e.target.value })}
        />
        <button type="submit">Add Client</button>
      </form>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Contact</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Terms</th>
          </tr>
        </thead>
        <tbody>
          {clients.map(c => (
            <tr key={c.id}>
              <td>{c.name}</td>
              <td>{c.contact_name}</td>
              <td>{c.phone}</td>
              <td>{c.email}</td>
              <td>{c.payment_terms}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}