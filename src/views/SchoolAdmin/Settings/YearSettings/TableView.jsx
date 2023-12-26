import { useContext, useState } from "react";

import { AuthContext } from "../../../../context/AuthContext.jsx";
import Button from "../../../../components/Elements/Button/index.jsx";
import ConfirmModal from "../../../../components/Elements/ConfirmModal/index.jsx";
import Logout from "../../../../components/Elements/Logout/index.js";
import NotFound from "../../../../components/Elements/EmptyState/NotFound.jsx";
import PropTypes from "prop-types";
import { refreshToken } from "../../../../services/auth/auth.service.js";
import { setTahunAjaran } from "../../../../services/school-admin/year-settings.service.js";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function YearSettingsTableView(props) {
  const { data, handleTahunAjaran } = props;
  const { setProgress } = useContext(AuthContext);
  const navigate = useNavigate();

  const [selected, setSelected] = useState({});

  const handleUpdateTahunAjaran = () => {
    setProgress(30);
    const data = {
      id: selected.id,
      status: true,
    };
    refreshToken((status, token) => {
      if (status) {
        setProgress(60);
        setTahunAjaran(data, token, (status) => {
          if (status) {
            toast.success(
              `Sukses! Tahun ajaran ${selected?.tahun_ajaran} sudah aktif.`,
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

  const initModal = (item) => {
    setSelected(item);
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
                Aktifkan
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
                      {!item.status ? (
                        <Button
                          variant="green"
                          onClick={() => {
                            initModal(item);
                          }}
                        >
                          <i className="fa-solid fa-power-off"></i>
                        </Button>
                      ) : (
                        <></>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8}>
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
        desc={`Apakah anda yakin ingin mengubah tahun berjalan menjadi ${selected?.tahun_ajaran}?`}
        labelOk="Ya"
        labelCancel="Tidak"
        onClick={() => handleUpdateTahunAjaran()}
      />
    </>
  );
}

YearSettingsTableView.propTypes = {
  data: PropTypes.any,
  handleTahunAjaran: PropTypes.func,
};
