import { useCallback, useContext, useEffect, useState } from "react";

import { AuthContext } from "../../../context/AuthContext";
import Logout from "../../../components/Elements/Logout";
import SupervisorPresenceTableView from "../../../views/Supervisor/Presence/TableView";
import { getKehadiranPembimbing } from "../../../services/supervisor/supervisor-presence.service";
import { refreshToken } from "../../../services/auth/auth.service";
import { useNavigate } from "react-router-dom";

export default function SupervisorPresencePage() {
  const { setProgress } = useContext(AuthContext);
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [tanggal, setTanggal] = useState("");

  const handlePresensi = useCallback(() => {
    if (tanggal == "") {
      const date = new Date();
      const dd = String(date.getDate()).padStart(2, "0");
      const mm = String(date.getMonth() + 1).padStart(2, "0");
      const yyyy = date.getFullYear();
      const dateString = yyyy + "-" + mm + "-" + dd;
      setTanggal(dateString);
    }

    setProgress(30);
    refreshToken((status, token) => {
      if (status) {
        setProgress(60);
        getKehadiranPembimbing(tanggal, token, (status, data) => {
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
    handlePresensi();
  }, [handlePresensi]);

  return (
    <>
      <div className="format max-w-none mb-5">
        <h1>Kehadiran Siswa</h1>
        <p>
          Anda dapat meilhat journal harian siswa yang ada dan menambahkan
          komentar untuk setiap journal harian siswa yang ada. Namun, anda tidak
          dapat mengubah jurnal harian siswa yang ada.
        </p>
        <div className="not-format">
          <SupervisorPresenceTableView
            handlePresensi={handlePresensi}
            data={data}
            setData={setData}
            tanggal={tanggal}
            setTanggal={setTanggal}
          />
        </div>
      </div>
    </>
  );
}
