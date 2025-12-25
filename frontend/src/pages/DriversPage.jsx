import { useEffect, useState } from "react";
import driverService from "../services/driverService";

export default function DriversPage() {
  const [drivers, setDrivers] = useState([]);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    cdl_number: "",
    status: "",
    notes: ""
  });

  useEffect(() => {
    loadDrivers();
  }, []);

  const loadDrivers = () => {
    driverService.getDrivers().then(res => setDrivers(res.data));
  };

  const handleSubmit = e => {
    e.preventDefault();
    driverService.createDriver(form).then(() => {
      loadDrivers();
      setForm({
        name: "",
        phone: "",
        email: "",
        cdl_number: "",
        status: "",
        notes: ""
      });
    });
  };

  return (
    <div>
      <h1>Drivers</h1>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Driver Name"
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
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
          placeholder="CDL Number"
          value={form.cdl_number}
          onChange={e => setForm({ ...form, cdl_number: e.target.value })}
        />
        <input
          placeholder="Status (Available / On Trip / Off)"
          value={form.status}
          onChange={e => setForm({ ...form, status: e.target.value })}
        />
        <textarea
          placeholder="Notes"
          value={form.notes}
          onChange={e => setForm({ ...form, notes: e.target.value })}
        />
        <button type="submit">Add Driver</button>
      </form>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>CDL</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {drivers.map(d => (
            <tr key={d.id}>
              <td>{d.name}</td>
              <td>{d.cdl_number}</td>
              <td>{d.phone}</td>
              <td>{d.email}</td>
              <td>{d.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}