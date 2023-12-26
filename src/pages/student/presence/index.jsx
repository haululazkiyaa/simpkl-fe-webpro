import { useCallback, useContext, useEffect, useState } from "react";

import { AuthContext } from "../../../context/AuthContext";
import Logout from "../../../components/Elements/Logout";
import StudentPresenceTableView from "../../../views/Student/Presence/TableView";
import { getKehadiranSiswa } from "../../../services/student/student-presence.service";
import { refreshToken } from "../../../services/auth/auth.service";
import { useNavigate } from "react-router-dom";

export default function StudentPresencePage() {
  const { setProgress } = useContext(AuthContext);
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [bulan, setBulan] = useState("");
  const [tahun, setTahun] = useState("");

  const handlePresensi = useCallback(() => {
    setData([]);
    if (bulan === "" && tahun === "") {
      const today = new Date();
      setBulan(today.getMonth() + 1);
      setTahun(today.getFullYear());
    }

    setProgress(30);
    refreshToken((status, token) => {
      if (status) {
        setProgress(60);
        getKehadiranSiswa(bulan, tahun, token, (status, data) => {
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
  }, [setProgress, navigate, bulan, tahun]);

  useEffect(() => {
    handlePresensi();
  }, [handlePresensi]);

  return (
    <>
      <div className="format max-w-none mb-5">
        <h1 className="dark:text-white">Kehadiran Siswa</h1>
        <div className="flex-none flex-row lg:flex">
          <div className="basis-2/6 lg:mr-5">
            <h2 className="dark:text-white">Statistik Kehadiran</h2>
            <p>
              Anda dapat meilhat journal harian siswa yang ada dan menambahkan
              komentar untuk setiap journal harian siswa yang ada.
            </p>
          </div>
          <div className="basis-4/6">
            <div className="not-format flex justify-between space-x-2">
              <div className="flex-1 p-3 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">
                  Total Hadir
                </p>
                <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
                  {data.jml_kehadiran?.HADIR || 0}
                </h5>
              </div>
              <div className="flex-1 p-3 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">
                  Total Izin
                </p>
                <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
                  {data.jml_kehadiran?.IZIN || 0}
                </h5>
              </div>
              <div className="flex-1 p-3 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">
                  Total Sakit
                </p>
                <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
                  {data.jml_kehadiran?.SAKIT || 0}
                </h5>
              </div>
              <div className="flex-1 p-3 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">
                  Total Alpa
                </p>
                <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
                  {data.jml_kehadiran?.ALPA || 0}
                </h5>
              </div>
            </div>
          </div>
        </div>
        <hr className="border-slate-100" />
        <div className="flex-none flex-row lg:flex">
          <div className="basis-2/6 lg:mr-5">
            <h2 className="dark:text-white">Riwayat Presensi</h2>
            <p>
              Anda dapat meilhat journal harian siswa yang ada dan menambahkan
              komentar untuk setiap journal harian siswa yang ada. Namun, anda
              tidak dapat mengubah jurnal harian siswa yang ada.
            </p>
          </div>
          <div className="basis-4/6">
            <div className="not-format">
              <StudentPresenceTableView
                handlePresensi={handlePresensi}
                data={data}
                setData={setData}
                bulan={bulan}
                setBulan={setBulan}
                tahun={tahun}
                setTahun={setTahun}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
