import { useEffect, useState } from "react";
import loadService from "../services/loadService";
import clientService from "../services/clientService";

export default function LoadsPage() {
  const [loads, setLoads] = useState([]);
  const [clients, setClients] = useState([]);

  const [form, setForm] = useState({
    client_id: "",
    origin_city: "",
    origin_state: "",
    destination_city: "",
    destination_state: "",
    pickup_datetime: "",
    delivery_datetime: "",
    rate: "",
    status: "",
    notes: ""
  });

  useEffect(() => {
    loadService.getLoads().then(res => setLoads(res.data));
    clientService.getClients().then(res => setClients(res.data));
  }, []);

  const handleSubmit = e => {
    e.preventDefault();
    loadService.createLoad(form).then(() => {
      loadService.getLoads().then(res => setLoads(res.data));
      setForm({
        client_id: "",
        origin_city: "",
        origin_state: "",
        destination_city: "",
        destination_state: "",
        pickup_datetime: "",
        delivery_datetime: "",
        rate: "",
        status: "",
        notes: ""
      });
    });
  };

  return (
    <div>
      <h1>Loads</h1>

      <form onSubmit={handleSubmit}>
        <select
          value={form.client_id}
          onChange={e => setForm({ ...form, client_id: e.target.value })}
        >
          <option value="">Select Client</option>
          {clients.map(c => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>

        <input
          placeholder="Origin City"
          value={form.origin_city}
          onChange={e => setForm({ ...form, origin_city: e.target.value })}
        />
        <input
          placeholder="Origin State"
          value={form.origin_state}
          onChange={e => setForm({ ...form, origin_state: e.target.value })}
        />
        <input
          placeholder="Destination City"
          value={form.destination_city}
          onChange={e => setForm({ ...form, destination_city: e.target.value })}
        />
        <input
          placeholder="Destination State"
          value={form.destination_state}
          onChange={e => setForm({ ...form, destination_state: e.target.value })}
        />

        <input
          type="datetime-local"
          value={form.pickup_datetime}
          onChange={e => setForm({ ...form, pickup_datetime: e.target.value })}
        />

        <input
          type="datetime-local"
          value={form.delivery_datetime}
          onChange={e => setForm({ ...form, delivery_datetime: e.target.value })}
        />

        <input
          placeholder="Rate"
          value={form.rate}
          onChange={e => setForm({ ...form, rate: e.target.value })}
        />

        <input
          placeholder="Status"
          value={form.status}
          onChange={e => setForm({ ...form, status: e.target.value })}
        />

        <textarea
          placeholder="Notes"
          value={form.notes}
          onChange={e => setForm({ ...form, notes: e.target.value })}
        />

        <button type="submit">Add Load</button>
      </form>

      <table>
        <thead>
          <tr>
            <th>Client</th>
            <th>Origin</th>
            <th>Destination</th>
            <th>Pickup</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {loads.map(load => (
            <tr key={load.id}>
              <td>{load.client_name}</td>
              <td>{load.origin_city}, {load.origin_state}</td>
              <td>{load.destination_city}, {load.destination_state}</td>
              <td>{load.pickup_datetime}</td>
              <td>{load.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}