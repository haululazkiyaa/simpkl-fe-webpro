import AddDataFirst from "../../../components/Elements/EmptyState/AddDataFirst.jsx";
import { AuthContext } from "../../../context/AuthContext.jsx";
import Button from "../../../components/Elements/Button/index.jsx";
import ConfirmModal from "../../../components/Elements/ConfirmModal/index.jsx";
import Input from "../../../components/Elements/Input/index.jsx";
import Logout from "../../../components/Elements/Logout/index.js";
import NotFound from "../../../components/Elements/EmptyState/NotFound.jsx";
import PropTypes from "prop-types";
import StudentDailyJournalAddDrawerView from "./AddDrawerView.jsx";
import { deleteJurnalHarian } from "../../../services/student/daily-journal.service.js";
import { refreshToken } from "../../../services/auth/auth.service.js";
import { toast } from "react-toastify";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

export default function StudentDailyJournalTableView(props) {
  const {
    handleDataHarian,
    selected,
    data,
    setData,
    setSelected,
    tanggal,
    setTanggal,
    today,
    setConfetti,
  } = props;
  const { setProgress } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleDeleteJurnalHarian = () => {
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
            setData({});
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

  const initModal1 = (data) => {
    setSelected(data);

    document.getElementById("init-modal1").click();
  };

  return (
    <>
      {Object.keys(data).length == 0 && (
        <div className="flex flex-col items-center justify-center">
          {tanggal == today ? (
            <div className="text-center">
              <AddDataFirst />
              <h3 className="text-xl text-black font-bold mb-5 dark:text-white">
                Opps! Kamu belum submit jurnal hari ini!
              </h3>
              <StudentDailyJournalAddDrawerView
                handleDataHarian={handleDataHarian}
                setConfetti={setConfetti}
                id="0"
              />
              <p className="mt-5">Ganti Tanggal:</p>
            </div>
          ) : (
            <div className="text-center">
              <NotFound />
              <h3 className="text-xl text-black font-bold mb-5 dark:text-white">
                Opps! Tidak ada jurnal yang kamu submit di tanggal ini.
              </h3>
              <p>Ganti Tanggal:</p>
            </div>
          )}
        </div>
      )}
      <div
        className={`md:flex ${
          Object.keys(data).length != 0 ? "justify-between" : "justify-center"
        }`}
      >
        <div className="space-x-2 flex items-center justify-center mb-5">
          {Object.keys(data).length != 0 && (
            <label className="text-black font-bold dark:text-white">
              Pilih Tanggal:
            </label>
          )}
          <Input
            type="date"
            name="tanggal"
            id="tanggal"
            placeholder="Masukan tanggal jurnal"
            value={tanggal}
            onChange={(e) => setTanggal(e.target.value)}
            required={true}
          />
        </div>
        {Object.keys(data).length != 0 && tanggal == today && (
          <div className="space-x-2 mb-5">
            <Button variant="yellow" onClick={() => updateDrawer(data)}>
              <i className="fa-solid fa-pen mr-2"></i>
              Edit
            </Button>
            <Button variant="red" onClick={() => initModal1(data)}>
              <i className="fa-solid fa-trash mr-2"></i>
              Hapus
            </Button>
          </div>
        )}
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-center rtl:text-right text-gray-500 dark:text-gray-400 ">
          <tbody>
            {Object.keys(data).length != 0 && (
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
                    {String(new Date(data.jam_mulai).getUTCHours()).padStart(
                      2,
                      "0"
                    )}
                    .
                    {String(new Date(data.jam_mulai).getUTCMinutes()).padStart(
                      2,
                      "0"
                    )}{" "}
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
                    {String(new Date(data.jam_selesai).getUTCHours()).padStart(
                      2,
                      "0"
                    )}
                    .
                    {String(
                      new Date(data.jam_selesai).getUTCMinutes()
                    ).padStart(2, "0")}{" "}
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
                      variant="default"
                      onClick={() => initStaticModal(data)}
                    >
                      <i className="fa-solid fa-eye mr-2"></i>Lihat
                    </Button>
                  </td>
                </tr>
              </>
            )}
          </tbody>
        </table>
      </div>
      <ConfirmModal
        desc={`Apakah anda yakin ingin mengapus jurnal hari ini?`}
        labelOk="Ya"
        labelCancel="Tidak"
        onClick={() => handleDeleteJurnalHarian()}
        id="1"
      />
    </>
  );
}

StudentDailyJournalTableView.propTypes = {
  handleDataHarian: PropTypes.any,
  data: PropTypes.any,
  setSelected: PropTypes.any,
  setData: PropTypes.any,
  setTanggal: PropTypes.any,
  tanggal: PropTypes.any,
  today: PropTypes.any,
  selected: PropTypes.any,
  setConfetti: PropTypes.any,
};
