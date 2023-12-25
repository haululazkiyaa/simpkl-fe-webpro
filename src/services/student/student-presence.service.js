import { axiosReq } from "../axios.service";

// services setting tahun ajaran
export const getKehadiranSiswa = async (bulan, tahun, token, callback) => {
  await axiosReq
    .get(
      `${
        import.meta.env.VITE_API_URL
      }/absensi/get/siswa?bulan=${bulan}&tahun=${tahun}`,
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
