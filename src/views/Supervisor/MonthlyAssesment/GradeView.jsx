import { useCallback, useContext, useEffect, useState } from "react";

import { AuthContext } from "../../../context/AuthContext.jsx";
import Logout from "../../../components/Elements/Logout/index.js";
import Modal from "../../../components/Elements/Modal/index.jsx";
import PropTypes from "prop-types";
import { getNilaiBulananPembimbing } from "../../../services/supervisor/supervisor-monthly-grade.service.js";
import { refreshToken } from "../../../services/auth/auth.service.js";
import { useNavigate } from "react-router-dom";

export default function SupervisorMonthlyAssesmentGradeView(props) {
  const { setProgress } = useContext(AuthContext);
  const { selected } = props;
  const navigate = useNavigate();

  const [detail, setDetail] = useState({});

  const handleNilaiBulanan = useCallback(() => {
    const today = new Date();
    const filterMonth = String(today.getMonth() + 1);
    const filterYear = today.getFullYear();

    setProgress(30);
    refreshToken((status, token) => {
      if (status) {
        setProgress(60);
        getNilaiBulananPembimbing(
          selected?.id,
          filterMonth,
          filterYear,
          token,
          (status, data) => {
            if (status) {
              setDetail(data);
            }
          }
        );
      } else {
        Logout((status) => {
          if (status) {
            navigate("/login");
          }
        });
      }
      setProgress(100);
    });
  }, [setProgress, navigate, selected]);

  useEffect(() => {
    handleNilaiBulanan();
  }, [handleNilaiBulanan, selected]);

  return (
    <Modal title="Detail Nilai Bulanan Siswa">
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-center rtl:text-right text-gray-500 dark:text-gray-400">
          <tbody>
            {detail != null ? (
              <>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 dark:text-white text-left"
                  >
                    Hari/Tanggal
                  </th>
                  <td className="px-6 py-4 text-left">
                    : {detail.hari},{" "}
                    {new Date(detail.tanggal).toLocaleString("id-ID", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </td>
                </tr>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 dark:text-white text-left"
                  >
                    Jenis Pekerjaan
                  </th>
                  <td className="px-6 py-4 text-left">
                    : {detail.jenis_pekerjaan}
                  </td>
                </tr>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 dark:text-white text-left"
                  >
                    Deskripsi Pekerjaan
                  </th>
                  <td className="px-6 py-4 text-left">
                    : {detail.deskripsi_pekerjaan}
                  </td>
                </tr>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 dark:text-white text-left"
                  >
                    Bentuk Kegiatan
                  </th>
                  <td className="px-6 py-4 text-left">
                    : {detail.bentuk_kegiatan}
                  </td>
                </tr>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 dark:text-white text-left"
                  >
                    Jam Mulai
                  </th>
                  <td className="px-6 py-4 text-left">
                    :{" "}
                    {new Date(detail.jam_mulai).toLocaleTimeString("id-ID", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}{" "}
                    WIB
                  </td>
                </tr>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 dark:text-white text-left"
                  >
                    Jam Selesai
                  </th>
                  <td className="px-6 py-4 text-left">
                    :{" "}
                    {new Date(detail.jam_selesai).toLocaleTimeString("id-ID", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}{" "}
                    WIB
                  </td>
                </tr>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 dark:text-white text-left"
                  >
                    Staff Yang Menugaskan
                  </th>
                  <td className="px-6 py-4 text-left">: {detail.staf}</td>
                </tr>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 dark:text-white text-left"
                  >
                    Foto Kegiatan
                  </th>
                  <td className="px-6 py-4 text-left">
                    <img src={detail.foto} alt="Foto Kegiatan" />
                  </td>
                </tr>
              </>
            ) : (
              <tr className="px-6 py-4 text-left">
                <td colSpan={3}>Tidak ada data</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Modal>
  );
}

SupervisorMonthlyAssesmentGradeView.propTypes = {
  setProgress: PropTypes.any,
  selected: PropTypes.any,
};
