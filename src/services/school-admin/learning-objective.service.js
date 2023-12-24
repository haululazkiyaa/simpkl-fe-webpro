import { axiosReq } from "../axios.service";

// services setting tahun ajaran
export const getTujuanPembelajaran = async (token, callback) => {
  await axiosReq
    .get(`${import.meta.env.VITE_API_URL}/tujuan-pembelajaran/all`, {
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

export const updateTujuanPembelajaran = async (data, token, callback) => {
  await axiosReq
    .put(`${import.meta.env.VITE_API_URL}/tujuan-pembelajaran/update`, data, {
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

export const addTujuanPembelajaran = async (data, token, callback) => {
  await axiosReq
    .post(`${import.meta.env.VITE_API_URL}/tujuan-pembelajaran/create`, data, {
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
