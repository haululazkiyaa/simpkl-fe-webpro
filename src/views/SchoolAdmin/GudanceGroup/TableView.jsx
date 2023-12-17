import {
  deleteKelBimbingan,
  updateKelBimbingan,
} from "../../../services/school-admin/guidance-group.service.js";

import { AuthContext } from "../../../context/AuthContext.jsx";
import ConfirmModal from "../../../components/Elements/ConfirmModal/index.jsx";
import Dropdown from "../../../components/Elements/Dropdown/index.jsx";
import Logout from "../../../components/Elements/Logout/index.js";
import PropTypes from "prop-types";
import { refreshToken } from "../../../services/auth/auth.service.js";
import { toast } from "react-toastify";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

export default function GuidanceGroupTableView(props) {
  const { handleKelBimbingan, data, selected, setSelected } = props;
  const { setProgress } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleStatusKelBimbingan = () => {
    setProgress(30);
    const data = {
      id: selected.id,
      status: !selected?.status,
    };
    refreshToken((status, token) => {
      if (status) {
        setProgress(60);
        updateKelBimbingan(data, token, (status) => {
          if (status) {
            toast.success(
              `Sukses! Siswa a.n. ${selected.siswa?.nama} telah di ${
                selected?.status ? "non-akitfkan" : "aktifkan"
              } dari kelompok bimbingan`,
              {
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              }
            );
            handleKelBimbingan();
          } else {
            toast.error(
              `Gagal ${
                selected?.status_aktif ? "menon-aktifkan" : "mengaktifkan"
              } siswa a.n. ${selected.siswa?.nama}!`,
              {
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              }
            );
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

  const handleDeleteKelBimbingan = () => {
    setProgress(30);
    const data = {
      id: selected.id,
    };
    refreshToken((status, token) => {
      if (status) {
        setProgress(60);
        deleteKelBimbingan(data, token, (status) => {
          if (status) {
            toast.success(
              `Sukses! Siswa a.n. ${selected.siswa?.nama} telah di hapus dari kelompok bimbingan`,
              {
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              }
            );
            handleKelBimbingan();
          } else {
            toast.error(
              `Gagal menghapus kelompok bimbingan siswa a.n. ${selected.siswa?.nama}!`,
              {
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              }
            );
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

  const initModal = (item) => {
    setSelected(item);
    document.getElementById("init-modal").click();
  };

  const initModal1 = (item) => {
    setSelected(item);
    document.getElementById("init-modal1").click();
  };

  const updateDrawer = (item) => {
    setSelected(item);
    document.getElementById("update-drawer1").click();
  };

  return (
    <>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-center rtl:text-right text-gray-500 dark:text-gray-400 ">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                No.
              </th>
              <th scope="col" className="px-6 py-3">
                NIS / NISN
              </th>
              <th scope="col" className="px-6 py-3">
                Nama Siswa
              </th>
              <th scope="col" className="px-6 py-3">
                Guru Pembimbing
              </th>
              <th scope="col" className="px-6 py-3">
                Perusahaan
              </th>
              <th scope="col" className="px-6 py-3">
                Instruktur
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody>
            {data.length != 0 ? (
              data.map((item, index) => (
                <tr
                  key={index}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {index + 1}
                  </th>
                  <td className="px-6 py-4">
                    {item.siswa?.nis} / {item.siswa?.nisn}
                  </td>
                  <td className="px-6 py-4 truncate text-left">
                    {item.siswa.nama}
                  </td>
                  <td className="px-6 py-4 truncate text-left">
                    {item.guru_pembimbing?.nama}
                  </td>
                  <td className="px-6 py-4 truncate">
                    {item.perusahaan?.nama_perusahaan}
                  </td>
                  <td className="px-6 py-4 truncate text-left">
                    {item.instruktur?.nama}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center">
                      {item.status ? (
                        <>
                          <div className="h-2.5 w-2.5 rounded-full bg-green-500 me-2 animate-pulse"></div>{" "}
                          Aktif
                        </>
                      ) : (
                        <>
                          <div className="h-2.5 w-2.5 rounded-full bg-red-500 me-2"></div>{" "}
                          Nonaktif
                        </>
                      )}
                    </div>
                  </td>
                  <td className="flex items-center justify-center px-3 py-2">
                    <Dropdown
                      index={index}
                      listMenu={[
                        {
                          variant: "default",
                          onClick: () => updateDrawer(item),
                          label: "Edit",
                        },
                        {
                          variant: `${item.status ? "danger" : "default"}`,
                          onClick: () => initModal(item),
                          label: `${item.status ? "Non-aktifkan" : "Aktifkan"}`,
                        },
                        {
                          variant: "danger",
                          onClick: () => initModal1(item),
                          label: "Hapus",
                        },
                      ]}
                    >
                      Aksi
                    </Dropdown>
                  </td>
                </tr>
              ))
            ) : (
              <tr className="px-6 py-4">
                <td colSpan={5}>Tidak ada data</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <ConfirmModal
        desc={`Apakah anda yakin ingin ${
          selected?.status ? "menon-aktifkan" : "mengaktifkan"
        } kelompok bimbingan siswa a.n. ${selected.siswa?.nama}?`}
        labelOk="Ya"
        labelCancel="Tidak"
        onClick={() => handleStatusKelBimbingan()}
      />
      <ConfirmModal
        desc={`Apakah anda yakin ingin mengapus kelompok bimbingan siswa a.n. ${selected.siswa?.nama}?`}
        labelOk="Ya"
        labelCancel="Tidak"
        onClick={() => handleDeleteKelBimbingan()}
        id="1"
      />
    </>
  );
}

GuidanceGroupTableView.propTypes = {
  data: PropTypes.any,
  handleKelBimbingan: PropTypes.func,
  selected: PropTypes.any,
  setSelected: PropTypes.any,
  id: PropTypes.string,
};
