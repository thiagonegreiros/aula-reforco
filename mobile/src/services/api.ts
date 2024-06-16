import { AppError } from "@/utils/AppError";
import axios from "axios";
import { SERVER_URL } from "@env";

const api = axios.create({
  baseURL: SERVER_URL,
});

api.interceptors.response.use(
  (response) => {
    if (response.data.status !== undefined && response.data.status !== 200) {
      return Promise.reject(new AppError(response.data.message));
    }

    return response;
  },
  (error) => {
    if (error.response && error.response.data) {
      console.error(error.response);

      return Promise.reject(new AppError(error.response.data.message));
    } else {
      return Promise.reject(new AppError(error));
    }
  }
);

export { api };
