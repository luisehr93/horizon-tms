import http from "./http";

export async function listClients({ search = "", isActive = "", page = 1, pageSize = 10 } = {}) {
  const params = new URLSearchParams();
  if (search) params.set("search", search);
  if (isActive !== "") params.set("isActive", isActive);
  params.set("page", String(page));
  params.set("pageSize", String(pageSize));
  return http(`/clients?${params.toString()}`);
}

export async function createClient(payload) {
  return http(`/clients`, { method: "POST", body: JSON.stringify(payload) });
}

export async function updateClient(id, payload) {
  return http(`/clients/${id}`, { method: "PATCH", body: JSON.stringify(payload) });
}

export async function deleteClient(id) {
  return http(`/clients/${id}`, { method: "DELETE" });
}
