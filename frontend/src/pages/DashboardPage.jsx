import { useEffect, useState } from "react";
import dashboardService from "../services/dashboardService";

export default function DashboardPage() {
  const [data, setData] = useState(null);

  useEffect(() => {
    dashboardService.getDashboard().then(res => setData(res.data));
  }, []);

  if (!data) return <div>Loading...</div>;

  return (
    <div>
      <h1>Dashboard</h1>

      <div style={{ display: "flex", gap: "20px" }}>
        <div>
          <h3>Active Loads</h3>
          <p>{data.loads_active}</p>
        </div>

        <div>
          <h3>Trips In Transit</h3>
          <p>{data.trips_in_transit}</p>
        </div>

        <div>
          <h3>Invoices Pending</h3>
          <p>{data.invoices_pending}</p>
        </div>

        <div>
          <h3>Revenue This Month</h3>
          <p>${data.revenue_month}</p>
        </div>
      </div>

      <h2>Revenue by Client</h2>
      <table>
        <thead>
          <tr>
            <th>Client</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {data.revenue_by_client.map((c, i) => (
            <tr key={i}>
              <td>{c.name}</td>
              <td>${c.total}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Loads by Status</h2>
      <table>
        <thead>
          <tr>
            <th>Status</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {data.loads_by_status.map((s, i) => (
            <tr key={i}>
              <td>{s.status}</td>
              <td>{s.total}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}