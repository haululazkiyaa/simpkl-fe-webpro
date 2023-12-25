import { useCallback, useContext, useEffect, useState } from "react";

import { AuthContext } from "../../../context/AuthContext";
import Logout from "../../../components/Elements/Logout";
import SupervisorMonthlyAssesmentGradeView from "../../../views/Supervisor/MonthlyAssesment/GradeView";
import SupervisorMonthlyAssesmentTableView from "../../../views/Supervisor/MonthlyAssesment/TableView";
import SupervisorMonthlyAssesmentUpdateDrawerView from "../../../views/Supervisor/MonthlyAssesment/UpdateDrawerView";
import { getKelBimbinganPembimbing } from "../../../services/supervisor/supervisor-monthly-grade.service";
import { refreshToken } from "../../../services/auth/auth.service";
import { useNavigate } from "react-router-dom";

export default function SupervisorMonthlyAssesmentPage() {
  const { setProgress } = useContext(AuthContext);
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [selected, setSelected] = useState("");

  const handleDataHarian = useCallback(() => {
    setProgress(30);
    refreshToken((status, token) => {
      if (status) {
        setProgress(60);
        getKelBimbinganPembimbing(token, (status, data) => {
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
    handleDataHarian();
  }, [handleDataHarian]);

  return (
    <>
      <div className="format max-w-none mb-5">
        <h1>Penilaian Bulanan</h1>
        <p>
          Anda dapat meilhat nilai bulanan siswa yang ada atau menambahkan nilai
          bulanan siswa yang ada atau mengubah nilai bulanan siswa yang ada.
        </p>
        <div className="not-format">
          <SupervisorMonthlyAssesmentTableView
            data={data}
            setSelected={setSelected}
          />
          <SupervisorMonthlyAssesmentUpdateDrawerView
            handleDataHarian={handleDataHarian}
            selected={selected}
            id="1"
          />
          <SupervisorMonthlyAssesmentGradeView
            data={data}
            selected={selected}
          />
        </div>
      </div>
    </>
  );
}
