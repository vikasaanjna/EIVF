import instance from "../config/axios.instace"; // Adjust the path based on your project structure
import { apiUrls } from "../constants/api.constants";

export const getEvents = (startDate: any, endDate: any) => {
  const payload = {
    StartTime: startDate.toISOString(),
    EndTime: endDate.toISOString(),
  };
  return instance.post(apiUrls.getEvents, payload);
};
