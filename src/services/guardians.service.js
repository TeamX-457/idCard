import { apiRequest } from "./api";

export const guardiansService = {
  create(payload) {
    return apiRequest("/guardians", { method: "POST", body: payload });
  },
  students(guardianId) {
    return apiRequest(`/guardians/${guardianId}/students`);
  },
  attachStudent(guardianId, payload) {
    return apiRequest(`/guardians/${guardianId}/students`, { method: "POST", body: payload });
  }
};
