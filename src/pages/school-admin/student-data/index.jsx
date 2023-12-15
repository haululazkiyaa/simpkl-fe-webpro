import { useCallback, useContext, useEffect, useState } from "react";

import { AuthContext } from "../../../context/AuthContext";
import Logout from "../../../components/Elements/Logout";
import StudentDataAddDrawerView from "../../..//views/SchoolAdmin/StudentData/AddDrawerView.jsx";
import StudentDataTableView from "../../..//views/SchoolAdmin/StudentData/TableView.jsx";
import StudentDataUpdateDrawerView from "../../../views/SchoolAdmin/StudentData/UpdateDrawerView";
import { getSiswa } from "../../../services/school-admin/student-data.service";
import { refreshToken } from "../../../services/auth/auth.service";
import { useNavigate } from "react-router-dom";

export default function SchoolAdminStudentDataPage() {
  const { setProgress } = useContext(AuthContext);
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [selected, setSelected] = useState("");

  const handleDataSiswa = useCallback(() => {
    setProgress(30);
    refreshToken((status, token) => {
      if (status) {
        setProgress(60);
        getSiswa(token, (status, data) => {
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
    handleDataSiswa();
  }, [handleDataSiswa]);

  return (
    <>
      <div className="format max-w-none mb-5">
        <h1>Data Siswa</h1>
        <p>
          Anda dapat meilhat data siswa yang ada atau menambahkan data siswa
          baru atau mengubah data siswa yang ada. Namun, anda tidak dapat
          menghapus data siswa yang sudah ditambahkan.
        </p>
        <div className="not-format">
          <div className="mb-5">
            <StudentDataAddDrawerView
              handleDataSiswa={handleDataSiswa}
              id="0"
            />
          </div>
          <StudentDataTableView
            data={data}
            selected={selected}
            setSelected={setSelected}
            handleDataSiswa={handleDataSiswa}
          />
          <StudentDataUpdateDrawerView
            handleDataSiswa={handleDataSiswa}
            selected={selected}
            id="1"
          />
        </div>
      </div>
    </>
  );
}
