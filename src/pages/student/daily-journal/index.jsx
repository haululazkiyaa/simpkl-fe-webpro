import { useCallback, useContext, useEffect, useState } from "react";

import { AuthContext } from "../../../context/AuthContext";
import Logout from "../../../components/Elements/Logout";
import StudentDailyJournalDetailView from "../../../views/Student/DailyJournal/DetailView";
import StudentDailyJournalTableView from "../../../views/Student/DailyJournal/TableView";
import StudentDailyJournalUpdateDrawerView from "../../../views/Student/DailyJournal/UpdateDrawerView";
import { getJurnalHarian } from "../../../services/student/daily-journal.service";
import { refreshToken } from "../../../services/auth/auth.service";
import { useNavigate } from "react-router-dom";

export default function StudentDailyJournalPage() {
  const { setProgress } = useContext(AuthContext);
  const navigate = useNavigate();

  const [data, setData] = useState({});
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
        getJurnalHarian(filterDate, token, (status, data) => {
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
        <h1>Jurnal Harian</h1>
        <div className="flex-none flex-row lg:flex">
          <div className="basis-2/6 lg:mr-5">
            <p>
              Anda dapat meilhat journal harian yang ada atau menambahkan
              komentar untuk setiap journal harian yang ada atau mengubah jurnal
              harian yang ada.
            </p>
          </div>
          <div className="basis-4/6">
            <div className="not-format">
              <StudentDailyJournalTableView
                handleDataHarian={handleDataHarian}
                data={data}
                setSelected={setSelected}
              />
              <StudentDailyJournalUpdateDrawerView
                handleDataHarian={handleDataHarian}
                selected={selected}
                id="1"
              />
              <StudentDailyJournalDetailView data={data} selected={selected} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
