import { AuthContext } from "../../../context/AuthContext.jsx";
import ConfirmModal from "../../../components/Elements/ConfirmModal/index.jsx";
import Dropdown from "../../../components/Elements/Dropdown/index.jsx";
import Logout from "../../../components/Elements/Logout/index.js";
import PropTypes from "prop-types";
import { refreshToken } from "../../../services/auth/auth.service.js";
import { setTahunAjaran } from "../../../services/school-admin/year-settings.service.js";
import { toast } from "react-toastify";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

export default function MajorManagementTableView(props) {
  const { data, handleJurusan, selected, setSelected } = props;
  const { setProgress } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleDeleteJurusan = () => {
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
            handleJurusan();
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

  const updateDrawer = (item) => {
    setSelected(item);
    document.getElementById("update-drawer1").click();
  };

  return (
    <>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-center rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                No.
              </th>
              <th scope="col" className="px-6 py-3">
                Bidang Keahlian
              </th>
              <th scope="col" className="px-6 py-3">
                Program Keahlian
              </th>
              <th scope="col" className="px-6 py-3">
                Kompetensi Keahlian (INTI)
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
                  <td className="px-6 py-4">{item.bidang_keahlian}</td>
                  <td className="px-6 py-4">{item.program_keahlian}</td>
                  <td className="px-6 py-4">{item.kompetensi_keahlian}</td>
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
                          variant: "danger",
                          onClick: () => {},
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
        desc={`Apakah anda yakin ingin menghapus jurusan ${selected?.bidang_keahlian}?`}
        labelOk="Ya"
        labelCancel="Tidak"
        onClick={() => handleDeleteJurusan()}
      />
    </>
  );
}

MajorManagementTableView.propTypes = {
  data: PropTypes.any,
  handleJurusan: PropTypes.func,
  selected: PropTypes.any,
  setSelected: PropTypes.any,
  id: PropTypes.string,
};
