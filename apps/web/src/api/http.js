const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

async function request(path, options = {}) {
  const res = await fetch(`${API_URL}${path}`, {
    headers: {
      Accept: "application/json",
      ...(options.body ? { "Content-Type": "application/json" } : {}),
      ...(options.headers || {}),
    },
    ...options,
  });

  if (!res.ok) {
    const txt = await res.text().catch(() => "");
    throw new Error(`API ${res.status}: ${txt || res.statusText}`);
  }

  const contentType = res.headers.get("content-type") || "";
  if (contentType.includes("application/json")) return res.json();
  return res.text();
}

export const apiGet = (path) => request(path, { method: "GET" });
export const apiPost = (path, body) => request(path, { method: "POST", body: JSON.stringify(body) });
export const apiPatch = (path, body) => request(path, { method: "PATCH", body: JSON.stringify(body) });
export const apiDelete = (path) => request(path, { method: "DELETE" });

export default request;
