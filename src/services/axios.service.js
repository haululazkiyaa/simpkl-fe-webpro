import axios from "axios";

export const axiosReq = axios.create({
  withCredentials: true,
  headers: {
    "Content-type": "application/json",
  },
});
