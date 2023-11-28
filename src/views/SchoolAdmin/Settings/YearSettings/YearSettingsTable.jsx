import {
  getTahunAjaran,
  setTahunAjaran,
} from "../../../../services/school-admin/settings/year-settings.service";
import { useCallback, useContext, useEffect, useState } from "react";

import { AuthContext } from "../../../../context/AuthContext";
import ConfirmModal from "../../../../components/Elements/ConfirmModal";
import Logout from "../../../../components/Elements/Logout";
import PropTypes from "prop-types";
import { refreshToken } from "../../../../services/auth/auth.service";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function YearSettingsTableView() {
  const { setProgress } = useContext(AuthContext);
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [selected, setSelected] = useState("");

  const getDetails = () => {
    const find = data.find((item) => item.id === selected);
    return find;
  };

  const handleTahunAjaran = useCallback(() => {
    setProgress(30);
    refreshToken((status, token) => {
      if (status) {
        setProgress(60);
        getTahunAjaran(token, (status, data) => {
          if (status) {
            setData(data);
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
  }, [setProgress, navigate]);

  useEffect(() => {
    handleTahunAjaran();
  }, [handleTahunAjaran]);

  const handleUpdateTahunAjaran = () => {
    setProgress(30);
    const data = {
      id: selected,
      status: true,
    };
    refreshToken((status, token) => {
      if (status) {
        setProgress(60);
        setTahunAjaran(data, token, (status) => {
          if (status) {
            toast.success(
              `Sukses! Tahun ajaran ${getDetails()?.tahun_ajaran} sudah aktif.`,
              {
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              }
            );
            handleTahunAjaran();
          } else {
            toast.error("Gagal mengganti tahun ajaran!", {
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

  const initModal = () => {
    document.getElementById("init-modal").click();
  };

  return (
    <>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-center rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Tahun Ajaran
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
                    {item.tahun_ajaran}
                  </th>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center">
                      {item.status ? (
                        <>
                          <div className="h-2.5 w-2.5 rounded-full bg-green-500 me-2"></div>{" "}
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
                  <td className="flex items-center justify-center px-6 py-4">
                    {!item.status ? (
                      <>
                        <button
                          onClick={() => {
                            initModal();
                            setSelected(item.id);
                          }}
                          className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                        >
                          Aktifkan
                        </button>
                      </>
                    ) : (
                      <></>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr className="px-6 py-4">
                <td colSpan={3}>Tidak ada data</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <ConfirmModal
        desc={`Apakah anda yakin ingin mengubah tahun berjalan menjadi ${
          getDetails()?.tahun_ajaran
        }?`}
        labelOk="Ya"
        labelCancel="Tidak"
        onClick={() => handleUpdateTahunAjaran()}
      />
    </>
  );
}

YearSettingsTableView.propTypes = {
  handleLogout: PropTypes.func,
};
