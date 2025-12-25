import { useEffect, useState } from "react";
import tripService from "../services/tripService";
import loadService from "../services/loadService";
import driverService from "../services/driverService";
import truckService from "../services/truckService";

export default function TripsPage() {
  const [trips, setTrips] = useState([]);
  const [loads, setLoads] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [trucks, setTrucks] = useState([]);

  const [form, setForm] = useState({
    load_id: "",
    driver_id: "",
    truck_id: "",
    dispatch_time: "",
    arrival_pickup: "",
    depart_pickup: "",
    arrival_delivery: "",
    depart_delivery: "",
    status: ""
  });

  useEffect(() => {
    tripService.getTrips().then(res => setTrips(res.data));
    loadService.getLoads().then(res => setLoads(res.data));
    driverService.getDrivers().then(res => setDrivers(res.data));
    truckService.getTrucks().then(res => setTrucks(res.data));
  }, []);

  const handleSubmit = e => {
    e.preventDefault();
    tripService.createTrip(form).then(() => {
      tripService.getTrips().then(res => setTrips(res.data));
      setForm({
        load_id: "",
        driver_id: "",
        truck_id: "",
        dispatch_time: "",
        arrival_pickup: "",
        depart_pickup: "",
        arrival_delivery: "",
        depart_delivery: "",
        status: ""
      });
    });
  };

  return (
    <div>
      <h1>Trips</h1>

      <form onSubmit={handleSubmit}>
        <select
          value={form.load_id}
          onChange={e => setForm({ ...form, load_id: e.target.value })}
        >
          <option value="">Select Load</option>
          {loads.map(l => (
            <option key={l.id} value={l.id}>
              {l.origin_city} → {l.destination_city}
            </option>
          ))}
        </select>

        <select
          value={form.driver_id}
          onChange={e => setForm({ ...form, driver_id: e.target.value })}
        >
          <option value="">Select Driver</option>
          {drivers.map(d => (
            <option key={d.id} value={d.id}>{d.name}</option>
          ))}
        </select>

        <select
          value={form.truck_id}
          onChange={e => setForm({ ...form, truck_id: e.target.value })}
        >
          <option value="">Select Truck</option>
          {trucks.map(t => (
            <option key={t.id} value={t.id}>{t.unit_number}</option>
          ))}
        </select>

        <input
          type="datetime-local"
          value={form.dispatch_time}
          onChange={e => setForm({ ...form, dispatch_time: e.target.value })}
        />

        <input
          type="datetime-local"
          value={form.arrival_pickup}
          onChange={e => setForm({ ...form, arrival_pickup: e.target.value })}
        />

        <input
          type="datetime-local"
          value={form.depart_pickup}
          onChange={e => setForm({ ...form, depart_pickup: e.target.value })}
        />

        <input
          type="datetime-local"
          value={form.arrival_delivery}
          onChange={e => setForm({ ...form, arrival_delivery: e.target.value })}
        />

        <input
          type="datetime-local"
          value={form.depart_delivery}
          onChange={e => setForm({ ...form, depart_delivery: e.target.value })}
        />

        <input
          placeholder="Status"
          value={form.status}
          onChange={e => setForm({ ...form, status: e.target.value })}
        />

        <button type="submit">Add Trip</button>
      </form>

      <table>
        <thead>
          <tr>
            <th>Load</th>
            <th>Driver</th>
            <th>Truck</th>
            <th>Dispatch</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {trips.map(t => (
            <tr key={t.id}>
              <td>{t.origin_city} → {t.destination_city}</td>
              <td>{t.driver_name}</td>
              <td>{t.truck_unit}</td>
              <td>{t.dispatch_time}</td>
              <td>{t.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}