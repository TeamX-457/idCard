import { apiRequest } from "./api";

export const authService = {
  login(payload) {
    return apiRequest("/auth/login", { method: "POST", body: payload, auth: false });
  },
  registerSchool(payload) {
    return apiRequest("/auth/register-school", { method: "POST", body: payload, auth: false });
  }
};
