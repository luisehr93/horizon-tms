const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export async function apiGet(path) {
  const res = await fetch(`${API_URL}${path}`, {
    method: "GET",
    headers: { "Accept": "application/json" },
  });

  if (!res.ok) {
    const txt = await res.text().catch(() => "");
    throw new Error(`API ${res.status}: ${txt || res.statusText}`);
  }
  return res.json();
}
