import { apiRequest } from "./api";

export const calendarService = {
  list() {
    return apiRequest("/calendar");
  },
  create(payload) {
    return apiRequest("/calendar", { method: "POST", body: payload });
  },
  remove(id) {
    return apiRequest(`/calendar/${id}`, { method: "DELETE" });
  }
};
