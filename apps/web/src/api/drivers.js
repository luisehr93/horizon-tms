import { apiGet, apiPost, apiPatch, apiDelete } from "./http";

export async function listDrivers({ search = "", isActive = "", isAvailable = "", page = 1, pageSize = 10 } = {}) {
  const params = new URLSearchParams();
  if (search) params.set("search", search);
  if (isActive !== "") params.set("isActive", isActive);
  if (isAvailable !== "") params.set("isAvailable", isAvailable);
  params.set("page", String(page));
  params.set("pageSize", String(pageSize));
  return apiGet(`/drivers?${params.toString()}`);
}

export async function createDriver(payload) {
  return apiPost(`/drivers`, payload);
}

export async function updateDriver(id, payload) {
  return apiPatch(`/drivers/${id}`, payload);
}

export async function deleteDriver(id) {
  return apiDelete(`/drivers/${id}`);
}
