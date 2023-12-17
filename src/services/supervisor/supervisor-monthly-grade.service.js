import { axiosReq } from "../axios.service";

// services setting tahun ajaran
export const getNilaiBulananPembimbing = async (
  filterMonth,
  filterYear,
  token,
  callback
) => {
  await axiosReq
    .get(
      `${
        import.meta.env.VITE_API_URL
      }/nilai-bulanan?siswa=in_id_siswa&bulan=${filterMonth}&tahun=${filterYear}`,
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

export const addNilaiBulananPembimbing = async (data, token, callback) => {
  await axiosReq
    .post(`${import.meta.env.VITE_API_URL}/nilai-bulanan/create`, data, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .then(() => {
      callback(true);
    })
    .catch((error) => {
      callback(false, error.response?.data.message);
      console.log(error);
    });
};
