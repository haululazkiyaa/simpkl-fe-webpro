import { useCallback, useContext, useEffect, useState } from "react";

import { AuthContext } from "../../../context/AuthContext";
import Logout from "../../../components/Elements/Logout";
import YearSettingsAddDrawerView from "../../../views/SchoolAdmin/Settings/YearSettings/AddDrawerView";
import YearSettingsTableView from "../../../views/SchoolAdmin/Settings/YearSettings/TableView";
import { getTahunAjaran } from "../../../services/school-admin/year-settings.service";
import { refreshToken } from "../../../services/auth/auth.service";
import { useNavigate } from "react-router-dom";

export default function SchoolAdminSettingsPage() {
  const { setProgress } = useContext(AuthContext);
  const navigate = useNavigate();

  const [data, setData] = useState([]);

  const handleTahunAjaran = useCallback(() => {
    setProgress(30);
    refreshToken((status, token) => {
      if (status) {
        setProgress(60);
        getTahunAjaran(token, (status, data) => {
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
    handleTahunAjaran();
  }, [handleTahunAjaran]);

  return (
    <>
      <div className="format max-w-none mb-5">
        <h1>Pengaturan</h1>
        <div className="flex-none flex-row lg:flex">
          <div className="basis-2/6 lg:mr-5">
            <h2>Tahun Ajaran</h2>
            <p>
              Anda dapat mengubah tahun ajaran berjalan melalui pengaturan ini.
              Data pada aplikasi akan ditampilkan sesuai tahun yang anda pilih.
            </p>
            <div className="not-format">
              <YearSettingsAddDrawerView
                handleTahunAjaran={handleTahunAjaran}
              />
            </div>
          </div>
          <div className="basis-4/6">
            <div className="not-format">
              <YearSettingsTableView
                data={data}
                handleTahunAjaran={handleTahunAjaran}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
