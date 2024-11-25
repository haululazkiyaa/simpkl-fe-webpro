import { useCallback, useContext, useEffect, useState } from "react";

import { AuthContext } from "../../../context/AuthContext";
import InstructorDailyMonitoringCommentView from "../../../views/Instructor/DailyMonitoring/CommentView";
import InstructorDailyMonitoringJournalView from "../../../views/Instructor/DailyMonitoring/JournalView";
import InstructorDailyMonitoringTableView from "../../../views/Instructor/DailyMonitoring/TableView";
import InstructorDailyMonitoringUpdateDrawerView from "../../../views/Instructor/DailyMonitoring/UpdateDrawerView";
import Logout from "../../../components/Elements/Logout";
import { getJurnalInstruktur } from "../../../services/instructor/instructor-monitoring.service";
import { refreshToken } from "../../../services/auth/auth.service";
import { useNavigate } from "react-router-dom";

export default function InstructorDailyMonitoringPage() {
  const { setProgress } = useContext(AuthContext);
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [selected, setSelected] = useState("");
  const [tanggal, setTanggal] = useState("");

  const handleDataHarian = useCallback(() => {
    setData([]);
    if (tanggal == "") {
      const today = new Date();
      const dd = String(today.getDate()).padStart(2, "0");
      const mm = String(today.getMonth() + 1).padStart(2, "0");
      const yyyy = today.getFullYear();
      const dateString = yyyy + "-" + mm + "-" + dd;
      setTanggal(dateString);
    }

    setProgress(30);
    refreshToken((status, token) => {
      if (status) {
        setProgress(60);
        getJurnalInstruktur(tanggal, token, (status, data) => {
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
  }, [setProgress, navigate, tanggal]);

  useEffect(() => {
    handleDataHarian();
  }, [handleDataHarian]);

  return (
    <>
      <div className="format max-w-none mb-5">
        <h1 className="dark:text-white">Monitoring Harian</h1>
        <p>
          Anda dapat melihat jurnal harian yang sudah dibuat oleh siswa
          bimbingan Anda, dan memberikan komentar. Jika data belum ada, hubungi
          siswa bimbingan Anda.
        </p>
        <div className="not-format">
          <InstructorDailyMonitoringTableView
            data={data}
            setSelected={setSelected}
            tanggal={tanggal}
            setTanggal={setTanggal}
          />
          <InstructorDailyMonitoringUpdateDrawerView
            handleDataHarian={handleDataHarian}
            selected={selected}
            id="1"
          />
          <InstructorDailyMonitoringJournalView
            data={data}
            selected={selected}
          />
          <InstructorDailyMonitoringCommentView
            data={data}
            selected={selected}
            id="1"
          />
        </div>
      </div>
    </>
  );
}
