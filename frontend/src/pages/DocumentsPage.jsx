import { useEffect, useState } from "react";
import documentService from "../services/documentService";
import tripService from "../services/tripService";

export default function DocumentsPage() {
  const [documents, setDocuments] = useState([]);
  const [trips, setTrips] = useState([]);

  const [form, setForm] = useState({
    trip_id: "",
    document_type: "",
    file_url: "",
    notes: ""
  });

  useEffect(() => {
    documentService.getDocuments().then(res => setDocuments(res.data));
    tripService.getTrips().then(res => setTrips(res.data));
  }, []);

  const handleSubmit = e => {
    e.preventDefault();
    documentService.createDocument(form).then(() => {
      documentService.getDocuments().then(res => setDocuments(res.data));
      setForm({
        trip_id: "",
        document_type: "",
        file_url: "",
        notes: ""
      });
    });
  };

  return (
    <div>
      <h1>Documents</h1>

      <form onSubmit={handleSubmit}>
        <select
          value={form.trip_id}
          onChange={e => setForm({ ...form, trip_id: e.target.value })}
        >
          <option value="">Select Trip</option>
          {trips.map(t => (
            <option key={t.id} value={t.id}>
              Trip #{t.id} — {t.origin_city} → {t.destination_city}
            </option>
          ))}
        </select>

        <input
          placeholder="Document Type (POD, BOL, Receipt)"
          value={form.document_type}
          onChange={e => setForm({ ...form, document_type: e.target.value })}
        />

        <input
          placeholder="File URL"
          value={form.file_url}
          onChange={e => setForm({ ...form, file_url: e.target.value })}
        />

        <textarea
          placeholder="Notes"
          value={form.notes}
          onChange={e => setForm({ ...form, notes: e.target.value })}
        />

        <button type="submit">Add Document</button>
      </form>

      <table>
        <thead>
          <tr>
            <th>Trip</th>
            <th>Type</th>
            <th>File</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          {documents.map(d => (
            <tr key={d.id}>
              <td>{d.trip_id}</td>
              <td>{d.document_type}</td>
              <td>
                {d.file_url ? (
                  <a href={d.file_url} target="_blank">View</a>
                ) : (
                  "No file"
                )}
              </td>
              <td>{d.notes}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}