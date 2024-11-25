import { axiosReq } from "../axios.service";

// services setting tahun ajaran
export const getPerusahaan = async (token, callback) => {
  await axiosReq
    .get(`${import.meta.env.VITE_API_URL}/perusahaan/all`, {
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

export const updatePerusahaan = async (data, token, callback) => {
  await axiosReq
    .put(`${import.meta.env.VITE_API_URL}/perusahaan/update-profile`, data, {
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
