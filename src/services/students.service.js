import { apiRequest } from "./api";

export const studentsService = {
  list(params) {
    return apiRequest("/students", { query: params });
  },
  create(payload) {
    return apiRequest("/students", { method: "POST", body: payload });
  },
  get(id) {
    return apiRequest(`/students/${id}`);
  },
  update(id, payload) {
    return apiRequest(`/students/${id}`, { method: "PATCH", body: payload });
  },
  unregister(id) {
    return apiRequest(`/students/${id}/unregister`, { method: "PATCH" });
  },
  guardians(studentId) {
    return apiRequest(`/students/${studentId}/guardians`);
  }
};
