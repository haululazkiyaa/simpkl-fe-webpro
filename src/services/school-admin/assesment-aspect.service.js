import { axiosReq } from "../axios.service";

// services setting tahun ajaran
export const getAspekPenilaian = async (token, callback) => {
  await axiosReq
    .get(`${import.meta.env.VITE_API_URL}/aspek-penilaian/all`, {
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

export const updateAspekPenilaian = async (data, token, callback) => {
  await axiosReq
    .put(`${import.meta.env.VITE_API_URL}/aspek-penilaian/update`, data, {
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

export const addAspekPenilaian = async (data, token, callback) => {
  await axiosReq
    .post(`${import.meta.env.VITE_API_URL}/aspek-penilaian/create`, data, {
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
