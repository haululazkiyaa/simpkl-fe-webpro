import { AuthContext } from "../../../context/AuthContext.jsx";
import Button from "../../../components/Elements/Button/index.jsx";
import Logout from "../../../components/Elements/Logout/index.js";
import PropTypes from "prop-types";
import StudentDailyJournalAddDrawerView from "./AddDrawerView.jsx";
import { deleteJurnalHarian } from "../../../services/student/daily-journal.service.js";
import { refreshToken } from "../../../services/auth/auth.service.js";
import { toast } from "react-toastify";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

export default function StudentDailyJournalTableView(props) {
  const { handleDataHarian, data, setSelected } = props;
  const { setProgress } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleDeleteJurnalHarian = (selected) => {
    setProgress(30);
    const data = {
      id: selected.id,
    };
    refreshToken((status, token) => {
      if (status) {
        setProgress(60);
        deleteJurnalHarian(data, token, (status) => {
          if (status) {
            toast.success(`Sukses! Jurnah harian berhasil dihapus.`, {
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            handleDataHarian();
          } else {
            toast.error("Gagal menghapus jurnal harian!", {
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          }
        });
      } else {
        Logout((status) => {
          if (status) {
            navigate("/login");
          }
        });
      }
      setProgress(100);
    });
  };

  const initStaticModal = (item) => {
    setSelected(item);
    document.getElementById("init-static-modal").click();
  };

  const updateDrawer = (item) => {
    setSelected(item);
    document.getElementById("update-drawer1").click();
  };

  return (
    <>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-center rtl:text-right text-gray-500 dark:text-gray-400 ">
          <tbody>
            {Object.keys(data).length != 0 ? (
              <>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 dark:text-white text-left"
                  >
                    Hari/Tanggal
                  </th>
                  <td className="px-6 py-4 text-left">
                    : {data.hari},{" "}
                    {new Date(data.tanggal).toLocaleString("id-ID", {
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
                    : {data.jenis_pekerjaan}
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
                    : {data.deskripsi_pekerjaan}
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
                    : {data.bentuk_kegiatan}
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
                    {new Date(data.jam_mulai).toLocaleTimeString("id-ID", {
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
                    {new Date(data.jam_selesai).toLocaleTimeString("id-ID", {
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
                  <td className="px-6 py-4 text-left">: {data.staf}</td>
                </tr>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 dark:text-white text-left"
                  >
                    Catatan Pembimbing
                  </th>
                  <td className="px-6 py-4 text-left">
                    : {data.catatan_pembimbing || "Belum ada catatan"}
                  </td>
                </tr>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 dark:text-white text-left"
                  >
                    Catatan Instruktur
                  </th>
                  <td className="px-6 py-4 text-left">
                    : {data.catatan_instruktur || "Belum ada catatan"}
                  </td>
                </tr>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 dark:text-white text-left"
                  >
                    Foto Kegiatan
                  </th>
                  <td className="px-3 py-2 text-left">
                    <Button
                      outline={true}
                      onClick={() => initStaticModal(data)}
                    >
                      Tampilkan
                    </Button>
                  </td>
                </tr>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 dark:text-white text-left"
                  >
                    Aksi
                  </th>
                  <td className="px-3 py-2 text-left">
                    <Button
                      outline={true}
                      variant="yellow"
                      onClick={() => updateDrawer(data)}
                    >
                      Edit Jurnal
                    </Button>
                    <Button
                      outline={true}
                      variant="red"
                      onClick={() => handleDeleteJurnalHarian(data)}
                    >
                      Hapus Jurnal
                    </Button>
                  </td>
                </tr>
              </>
            ) : (
              <tr className="px-6 py-4 text-left">
                <td colSpan={3}>Tidak ada data</td>
                <StudentDailyJournalAddDrawerView
                  handleDataHarian={handleDataHarian}
                  id="0"
                />
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

StudentDailyJournalTableView.propTypes = {
  handleDataHarian: PropTypes.any,
  data: PropTypes.any,
  setSelected: PropTypes.any,
};
