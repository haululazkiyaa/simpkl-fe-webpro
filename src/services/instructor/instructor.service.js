import { axiosReq } from "../axios.service";

// services setting tahun ajaran
export const getInstruktur = async (token, callback) => {
  await axiosReq
    .get(`${import.meta.env.VITE_API_URL}/instruktur/all`, {
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

export const updateInstruktur = async (data, token, callback) => {
  await axiosReq
    .put(`${import.meta.env.VITE_API_URL}/instruktur/update`, data, {
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

export const addInstruktur = async (data, token, callback) => {
  await axiosReq
    .post(`${import.meta.env.VITE_API_URL}/instruktur/create`, data, {
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
