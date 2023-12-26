import { useCallback, useContext, useEffect, useState } from "react";

import { AuthContext } from "../../../context/AuthContext";
import Logout from "../../../components/Elements/Logout";
import MajorManagementAddDrawerView from "../../../views/SchoolAdmin/MajorManagement/AddDrawerView";
import MajorManagementTableView from "../../../views/SchoolAdmin/MajorManagement/TableView";
import MajorManagementUpdateDrawerView from "../../../views/SchoolAdmin/MajorManagement/UpdateDrawerView";
import { getJurusan } from "../../../services/school-admin/major-management.service";
import { refreshToken } from "../../../services/auth/auth.service";
import { useNavigate } from "react-router-dom";

export default function SchoolAdminMajorManagementPage() {
  const { setProgress } = useContext(AuthContext);
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [selected, setSelected] = useState("");

  const handleJurusan = useCallback(() => {
    setProgress(30);
    refreshToken((status, token) => {
      if (status) {
        setProgress(60);
        getJurusan(token, (status, data) => {
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
    handleJurusan();
  }, [handleJurusan]);

  return (
    <>
      <div className="format max-w-none mb-5">
        <h1 className="dark:text-white">Kelola Jurusan</h1>
        <p>
          Anda dapat melihat data jurusan yang ada, menambahkan, mengubah dan
          menghapus jurusan yang ada.
        </p>
        <div className="not-format">
          <div className="mb-5">
            <MajorManagementAddDrawerView
              handleJurusan={handleJurusan}
              id="0"
            />
          </div>
          <MajorManagementTableView
            data={data}
            selected={selected}
            setSelected={setSelected}
            handleJurusan={handleJurusan}
          />
          <MajorManagementUpdateDrawerView
            handleJurusan={handleJurusan}
            selected={selected}
            id="1"
          />
        </div>
      </div>
    </>
  );
}
