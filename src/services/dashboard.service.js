import { apiRequest } from "./api";

export const dashboardService = {
  today() {
    return apiRequest("/dashboard/today");
  }
};
