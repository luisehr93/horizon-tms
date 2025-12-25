import { useEffect, useState } from "react";
import truckService from "../services/truckService";

export default function TrucksPage() {
  const [trucks, setTrucks] = useState([]);
  const [form, setForm] = useState({
    unit_number: "",
    plate: "",
    vin: "",
    type: "",
    status: ""
  });

  useEffect(() => {
    loadTrucks();
  }, []);

  const loadTrucks = () => {
    truckService.getTrucks().then(res => setTrucks(res.data));
  };

  const handleSubmit = e => {
    e.preventDefault();
    truckService.createTruck(form).then(() => {
      loadTrucks();
      setForm({
        unit_number: "",
        plate: "",
        vin: "",
        type: "",
        status: ""
      });
    });
  };

  return (
    <div>
      <h1>Trucks</h1>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Unit Number"
          value={form.unit_number}
          onChange={e => setForm({ ...form, unit_number: e.target.value })}
        />
        <input
          placeholder="Plate"
          value={form.plate}
          onChange={e => setForm({ ...form, plate: e.target.value })}
        />
        <input
          placeholder="VIN"
          value={form.vin}
          onChange={e => setForm({ ...form, vin: e.target.value })}
        />
        <input
          placeholder="Type (Tractor / Box Truck / Hotshot)"
          value={form.type}
          onChange={e => setForm({ ...form, type: e.target.value })}
        />
        <input
          placeholder="Status (Available / On Trip / Maintenance)"
          value={form.status}
          onChange={e => setForm({ ...form, status: e.target.value })}
        />
        <button type="submit">Add Truck</button>
      </form>

      <table>
        <thead>
          <tr>
            <th>Unit</th>
            <th>Plate</th>
            <th>VIN</th>
            <th>Type</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {trucks.map(t => (
            <tr key={t.id}>
              <td>{t.unit_number}</td>
              <td>{t.plate}</td>
              <td>{t.vin}</td>
              <td>{t.type}</td>
              <td>{t.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}