import { apiRequest } from "./api";

export const cardsService = {
  assign(payload) {
    return apiRequest("/card", { method: "POST", body: payload });
  },
  revoke(id) {
    return apiRequest(`/card/${id}/revoke`, { method: "PATCH" });
  }
};
