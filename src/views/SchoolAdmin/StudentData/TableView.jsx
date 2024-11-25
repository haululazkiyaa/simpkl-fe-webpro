import {
  deleteSiswa,
  setSiswa,
} from "../../../services/school-admin/student-data.service.js";

import { AuthContext } from "../../../context/AuthContext.jsx";
import Button from "../../../components/Elements/Button/index.jsx";
import ConfirmModal from "../../../components/Elements/ConfirmModal/index.jsx";
import Logout from "../../../components/Elements/Logout/index.js";
import NotFound from "../../../components/Elements/EmptyState/NotFound.jsx";
import PropTypes from "prop-types";
import { refreshToken } from "../../../services/auth/auth.service.js";
import { toast } from "react-toastify";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

export default function StudentDataTableView(props) {
  const { handleDataSiswa, data, selected, setSelected } = props;
  const { setProgress } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleStatusSiswa = () => {
    setProgress(30);
    const data = {
      id: selected.id,
      status_aktif: !selected?.status_aktif,
    };
    refreshToken((status, token) => {
      if (status) {
        setProgress(60);
        setSiswa(data, token, (status) => {
          if (status) {
            toast.success(
              `Sukses! Siswa a.n. ${selected?.nama} telah berstatus ${
                selected?.status_aktif ? "non-akitf" : "aktif"
              }`,
              {
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              }
            );
            handleDataSiswa();
          } else {
            toast.error(
              `Gagal ${
                selected?.status_aktif ? "menon-aktifkan" : "mengaktifkan"
              } siswa a.n. ${selected?.nama}!`,
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

  const handleDeleteSiswa = () => {
    setProgress(30);
    const data = {
      id: selected.id,
    };
    refreshToken((status, token) => {
      if (status) {
        setProgress(60);
        deleteSiswa(data, token, (status, message) => {
          if (status) {
            toast.success(message, {
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            handleDataSiswa();
          } else {
            toast.error(message, {
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
              <th scope="col" className="w-16 px-3">
                No.
              </th>
              <th scope="col" className="px-6 py-3">
                NIS / NISN
              </th>
              <th scope="col" className="px-6 py-3">
                Nama
              </th>
              <th scope="col" className="px-6 py-3">
                Jurusan
              </th>
              <th scope="col" className="px-6 py-3">
                TTL
              </th>
              <th scope="col" className="px-6 py-3">
                Alamat
              </th>
              <th scope="col" className="px-6 py-3">
                No. HP
              </th>
              <th scope="col" className="px-6 py-3">
                Username
              </th>
              <th scope="col" className="px-6 py-3">
                Kata Sandi Sementara
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="w-16 px-3">
                Aktif/ Non-aktifkan
              </th>
              <th scope="col" className="w-16 px-3">
                Edit
              </th>
              <th scope="col" className="w-16 px-3">
                Hapus
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
                    className="w-16 px-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {index + 1}
                  </th>
                  <td className="px-6 py-4">
                    {item.nis} / {item.nisn}
                  </td>
                  <td className="px-6 py-4 truncate text-left">{item.nama}</td>
                  <td className="px-6 py-4 truncate text-left">
                    {item.jurusan?.kompetensi_keahlian}
                  </td>
                  <td className="px-6 py-4 truncate">
                    {item.tempat_lahir},{" "}
                    {new Date(item.tanggal_lahir).toLocaleString("id-ID", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </td>
                  <td className="px-6 py-4 truncate text-left">
                    {item.alamat}
                  </td>
                  <td className="px-6 py-4">{item.no_hp}</td>
                  <td className="px-6 py-4">{item.user?.username}</td>
                  <td className="px-6 py-4">
                    {item.user?.temp_password || "-"}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center">
                      {item.status_aktif ? (
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
                  <td className="w-16 px-3">
                    <div className="flex items-center justify-center">
                      <Button variant="default" onClick={() => initModal(item)}>
                        <i className="fa-solid fa-power-off"></i>
                      </Button>
                    </div>
                  </td>
                  <td className="w-16 px-3">
                    <div className="flex items-center justify-center">
                      <Button
                        variant="yellow"
                        onClick={() => updateDrawer(item)}
                      >
                        <i className="fa-solid fa-pen"></i>
                      </Button>
                    </div>
                  </td>
                  <td className="w-16 px-3">
                    <div className="flex items-center justify-center">
                      <Button variant="red" onClick={() => initModal1(item)}>
                        <i className="fa-solid fa-trash"></i>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={13}>
                  <NotFound />
                  <h3 className="text-xl text-black font-bold mb-5 dark:text-white">
                    Opps! Belum ada data apapun!
                  </h3>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <ConfirmModal
        desc={`Apakah anda yakin ingin ${
          selected?.status_aktif ? "menon-aktifkan" : "mengaktifkan"
        } siswa a.n. ${selected?.nama}?`}
        labelOk="Ya"
        labelCancel="Tidak"
        onClick={() => handleStatusSiswa()}
      />
      <ConfirmModal
        desc={`Apakah anda yakin ingin mengapus siswa a.n. ${selected.nama}?`}
        labelOk="Ya"
        labelCancel="Tidak"
        onClick={() => handleDeleteSiswa()}
        id="1"
      />
    </>
  );
}

StudentDataTableView.propTypes = {
  data: PropTypes.any,
  handleDataSiswa: PropTypes.func,
  selected: PropTypes.any,
  setSelected: PropTypes.any,
  id: PropTypes.string,
};
