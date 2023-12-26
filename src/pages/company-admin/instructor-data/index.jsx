import { useCallback, useContext, useEffect, useState } from "react";

import { AuthContext } from "../../../context/AuthContext";
import InstructorDataAddDrawerView from "../../../views/CompanyAdmin/InstructorData/AddDrawerView";
import InstructorDataTableView from "../../../views/CompanyAdmin/InstructorData/TableView";
import InstructorDataUpdateDrawerView from "../../../views/CompanyAdmin/InstructorData/UpdateDrawerView";
import Logout from "../../../components/Elements/Logout";
import { getInstruktur } from "../../../services/instructor/instructor.service";
import { refreshToken } from "../../../services/auth/auth.service";
import { useNavigate } from "react-router-dom";

export default function CompanyAdminInstructorDataPage() {
  const { setProgress } = useContext(AuthContext);
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [selected, setSelected] = useState("");

  const handleDataInstruktur = useCallback(() => {
    setProgress(30);
    refreshToken((status, token) => {
      if (status) {
        setProgress(60);
        getInstruktur(token, (status, data) => {
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
    handleDataInstruktur();
  }, [handleDataInstruktur]);

  return (
    <>
      <div className="format max-w-none mb-5">
        <h1 className="dark:text-white">Data Instruktur</h1>
        <p>
          Anda dapat meilhat data instruktur yang ada atau menambahkan data
          instruktur baru atau mengubah data instruktur yang ada. Namun, anda
          tidak dapat menghapus data instruktur yang sudah ditambahkan.
        </p>
        <div className="not-format">
          <div className="mb-5">
            <InstructorDataAddDrawerView
              handleDataInstruktur={handleDataInstruktur}
              id="0"
            />
          </div>
          <InstructorDataTableView
            data={data}
            selected={selected}
            setSelected={setSelected}
            handleDataInstruktur={handleDataInstruktur}
          />
          <InstructorDataUpdateDrawerView
            handleDataInstruktur={handleDataInstruktur}
            selected={selected}
            id="1"
          />
        </div>
      </div>
    </>
  );
}
