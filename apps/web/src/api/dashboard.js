import { apiGet } from "./http";

export function getDashboard() {
  return apiGet("/dashboard");
}
