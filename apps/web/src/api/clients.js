import { apiGet, apiPost, apiPatch, apiDelete } from "./http";

export async function listClients({ search = "", isActive = "", page = 1, pageSize = 10 } = {}) {
  const params = new URLSearchParams();
  if (search) params.set("search", search);
  if (isActive !== "") params.set("isActive", isActive);
  params.set("page", String(page));
  params.set("pageSize", String(pageSize));
  return apiGet(`/clients?${params.toString()}`);
}

export async function createClient(payload) {
  return apiPost(`/clients`, payload);
}

export async function updateClient(id, payload) {
  return apiPatch(`/clients/${id}`, payload);
}

export async function deleteClient(id) {
  return apiDelete(`/clients/${id}`);
}
