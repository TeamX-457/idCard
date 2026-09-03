import { apiRequest } from "./api";

export const attendanceService = {
  list(params) {
    return apiRequest("/attendance", { query: params });
  },
  record(payload) {
    return apiRequest("/attendance", { method: "POST", body: payload, auth: false });
  },
  getRules() {
    return apiRequest("/attendance-rules");
  },
  updateRules(payload) {
    return apiRequest("/attendance-rules", { method: "PATCH", body: payload });
  }
};
