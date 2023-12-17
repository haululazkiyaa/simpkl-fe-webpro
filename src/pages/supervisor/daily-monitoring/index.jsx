import { useCallback, useContext, useEffect, useState } from "react";

import { AuthContext } from "../../../context/AuthContext";
import Logout from "../../../components/Elements/Logout";
import SupervisorDailyMonitoringCommentView from "../../../views/Supervisor/DailyMonitoring/CommentView";
import SupervisorDailyMonitoringJournalView from "../../../views/Supervisor/DailyMonitoring/JournalView";
import SupervisorDailyMonitoringTableView from "../../../views/Supervisor/DailyMonitoring/TableView";
import SupervisorDailyMonitoringUpdateDrawerView from "../../../views/Supervisor/DailyMonitoring/UpdateDrawerView";
import { getJurnalPembimbing } from "../../../services/supervisor/supervisor-monitoring.service";
import { refreshToken } from "../../../services/auth/auth.service";
import { useNavigate } from "react-router-dom";

export default function SupervisorDailyMonitoringPage() {
  const { setProgress } = useContext(AuthContext);
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [selected, setSelected] = useState("");

  const handleDataHarian = useCallback(() => {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const yyyy = today.getFullYear();
    const filterDate = yyyy + "-" + mm + "-" + dd;

    setProgress(30);
    refreshToken((status, token) => {
      if (status) {
        setProgress(60);
        getJurnalPembimbing(filterDate, token, (status, data) => {
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
        <h1>Monitoring Harian</h1>
        <p>
          Anda dapat meilhat journal harian siswa yang ada dan menambahkan
          komentar untuk setiap journal harian siswa yang ada. Namun, anda tidak
          dapat mengubah jurnal harian siswa yang ada.
        </p>
        <div className="not-format">
          <SupervisorDailyMonitoringTableView
            data={data}
            setSelected={setSelected}
          />
          <SupervisorDailyMonitoringUpdateDrawerView
            handleDataHarian={handleDataHarian}
            selected={selected}
            id="1"
          />
          <SupervisorDailyMonitoringJournalView
            data={data}
            selected={selected}
          />
          <SupervisorDailyMonitoringCommentView
            data={data}
            selected={selected}
            id="1"
          />
        </div>
      </div>
    </>
  );
}
