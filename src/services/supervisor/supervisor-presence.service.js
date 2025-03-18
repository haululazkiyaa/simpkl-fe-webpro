import { axiosReq } from "../axios.service";

// services setting tahun ajaran
export const getKehadiranPembimbing = async (filterDate, token, callback) => {
  await axiosReq
    .get(
      `${
        import.meta.env.VITE_API_LARAVEL_URL
      }/absensi/get/pembimbing?tanggal=${filterDate}`,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    )
    .then((res) => {
      callback(true, res.data.data);
    })
    .catch(() => {
      callback(false);
    });
};

export const submitKehadiran = async (data, token, callback) => {
  await axiosReq
    .post(`${import.meta.env.VITE_API_LARAVEL_URL}/absensi/submit`, data, {
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
