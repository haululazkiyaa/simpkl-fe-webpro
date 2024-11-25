import { axiosReq } from "../axios.service";
export const register = async (data, callback) => {
  try {
    await axiosReq.post(
      `${import.meta.env.VITE_API_URL}/perusahaan/registrasi`,
      data
    );
    callback(true);
  } catch (error) {
    if (error.response) {
      callback(false, error.response.data.message);
    }
  }
};

export const login = async (data, callback) => {
  try {
    await axiosReq.post(`${import.meta.env.VITE_API_URL}/auth/login`, data);
    callback(true);
  } catch (error) {
    if (error.response) {
      callback(false, error.response.data.message);
    }
  }
};

export const refreshToken = async (callback) => {
  try {
    const response = await axiosReq.get(
      `${import.meta.env.VITE_API_URL}/auth/refresh-token`
    );
    callback(true, response.data.data.accessToken);
  } catch (error) {
    callback(false);
  }
};

export const logout = async (callback) => {
  try {
    await axiosReq.delete(`${import.meta.env.VITE_API_URL}/auth/logout`);
    callback(true);
  } catch (error) {
    if (error.response) {
      callback(false, error.response.data.message);
    }
  }
};
