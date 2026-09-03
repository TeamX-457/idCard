import { apiRequest } from "./api";

export const devicesService = {
  list() {
    return apiRequest("/devices");
  },
  register(payload) {
    return apiRequest("/devices", { method: "POST", body: payload });
  },
  disable(id) {
    return apiRequest(`/devices/${id}/disable`, { method: "PATCH" });
  },
  resetSecret(id) {
    return apiRequest(`/devices/${id}/reset-secret`, { method: "PATCH" });
  }
};
