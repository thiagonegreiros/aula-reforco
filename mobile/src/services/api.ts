import { AppError } from "@/utils/AppError";
import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.15.6:3001",
});

api.interceptors.response.use(
  (response) => {
    if (response.data.status !== undefined && response.data.stataus !== 200) {
      return Promise.reject(new AppError(response.data.message));
    }

    return response;
  },
  (error) => {
    if (error.response && error.response.data) {
      return Promise.reject(new AppError(error.response.data.message));
    } else {
      return Promise.reject(new AppError(error));
    }
  }
);

export { api };
