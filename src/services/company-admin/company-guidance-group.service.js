import { axiosReq } from "../axios.service";

// services setting tahun ajaran
export const getKelBimbinganPerusahaan = async (token, callback) => {
  await axiosReq
    .get(`${import.meta.env.VITE_API_URL}/kelompok-bimbingan/perusahaan`, {
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

export const getKelBimbinganPerusahaanByInstruktur = async (
  idInstruktur,
  token,
  callback
) => {
  await axiosReq
    .get(
      `${
        import.meta.env.VITE_API_URL
      }/kelompok-bimbingan/perusahaan?idInstruktur=${idInstruktur}`,
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
