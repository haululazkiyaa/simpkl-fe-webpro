import { axiosReq } from "../axios.service";

// services setting tahun ajaran
export const getKelBimbingan = async (token, callback) => {
  await axiosReq
    .get(`${import.meta.env.VITE_API_URL}/kelompok-bimbingan/all`, {
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

export const addKelBimbingan = async (data, token, callback) => {
  await axiosReq
    .post(`${import.meta.env.VITE_API_URL}/kelompok-bimbingan/create`, data, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .then(() => {
      callback(true);
    })
    .catch((error) => {
      callback(false, error.response?.data.message);
    });
};

export const updateKelBimbingan = async (data, token, callback) => {
  await axiosReq
    .put(`${import.meta.env.VITE_API_URL}/kelompok-bimbingan/update`, data, {
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

export const deleteKelBimbingan = async (data, token, callback) => {
  await axiosReq
    .delete(`${import.meta.env.VITE_API_URL}/kelompok-bimbingan/delete`, {
      data,
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .then((res) => {
      callback(true, res.data.message);
    })
    .catch((error) => {
      callback(false, error.response.data.message);
    });
};