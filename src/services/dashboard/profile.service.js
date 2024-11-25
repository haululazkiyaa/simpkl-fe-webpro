import { axiosReq } from "../axios.service";

export const getProfile = async (token, callback) => {
  await axiosReq
    .get(`${import.meta.env.VITE_API_URL}/auth/profile`, {
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
