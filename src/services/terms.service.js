import { apiRequest } from "./api";

export const termsService = {
  list() {
    return apiRequest("/terms");
  },
  create(payload) {
    return apiRequest("/terms", { method: "POST", body: payload });
  },
  remove(id) {
    return apiRequest(`/terms/${id}`, { method: "DELETE" });
  }
};
