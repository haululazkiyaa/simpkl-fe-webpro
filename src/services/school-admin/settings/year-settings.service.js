import { axiosReq } from "../../axios.service";

export const getTahunAjaran = async (token, callback) => {
  await axiosReq
    .get(`${import.meta.env.VITE_API_URL}/tahun-ajaran/all`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .then((res) => {
      callback(true, res.data.data);
    })
    .catch(() => {
      callback(false);
    });
};

export const setTahunAjaran = async (data, token, callback) => {
  await axiosReq
    .put(`${import.meta.env.VITE_API_URL}/tahun-ajaran/status`, data, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .then(() => {
      callback(true);
    })
    .catch(() => {
      callback(false);
    });
};

export const addTahunAjaran = async (data, token, callback) => {
  await axiosReq
    .post(`${import.meta.env.VITE_API_URL}/tahun-ajaran/create`, data, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .then(() => {
      callback(true);
    })
    .catch((error) => {
      callback(false, error.response.data.message);
    });
};
