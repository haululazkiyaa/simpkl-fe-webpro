import { axiosReq } from "../axios.service";

// services setting tahun ajaran
export const getJurusan = async (token, callback) => {
  await axiosReq
    .get(`${import.meta.env.VITE_API_LARAVEL_URL}/jurusan/all`, {
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

export const addJurusan = async (data, token, callback) => {
  await axiosReq
    .post(`${import.meta.env.VITE_API_LARAVEL_URL}/jurusan/create`, data, {
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

export const updateJurusan = async (data, token, callback) => {
  await axiosReq
    .put(`${import.meta.env.VITE_API_LARAVEL_URL}/jurusan/update`, data, {
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

export const deleteJurusan = async (data, token, callback) => {
  await axiosReq
    .delete(`${import.meta.env.VITE_API_LARAVEL_URL}/jurusan/delete`, {
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
