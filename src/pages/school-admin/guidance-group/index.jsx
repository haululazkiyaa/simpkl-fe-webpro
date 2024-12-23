import { useCallback, useContext, useEffect, useState } from "react";

import { AuthContext } from "../../../context/AuthContext";
import GuidanceGroupAddDrawerView from "../../../views/SchoolAdmin/GudanceGroup/AddDrawerView";
import GuidanceGroupTableView from "../../../views/SchoolAdmin/GudanceGroup/TableView";
import GuidanceGroupUpdateDrawerView from "../../../views/SchoolAdmin/GudanceGroup/UpdateDrawerView";
import Logout from "../../../components/Elements/Logout";
import { getKelBimbingan } from "../../../services/school-admin/guidance-group.service";
import { refreshToken } from "../../../services/auth/auth.service";
import { useNavigate } from "react-router-dom";

export default function SchoolAdminGuidanceGroupPage() {
  const { setProgress } = useContext(AuthContext);
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [selected, setSelected] = useState("");

  const handleKelBimbingan = useCallback(() => {
    setProgress(30);
    refreshToken((status, token) => {
      if (status) {
        setProgress(60);
        getKelBimbingan(token, (status, data) => {
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
    handleKelBimbingan();
  }, [handleKelBimbingan]);

  return (
    <>
      <div className="format max-w-none mb-5">
        <h1 className="dark:text-white">Kelompok Bimbingan</h1>
        <p>
          Anda dapat melihat data Kelompok Bimbingan berdasarkan tahun ajaran
          yang sedang aktif, menambahkan, mengubah data dan status aktif, serta
          menghapus data Kelompok Bimbingan.
        </p>
        <div className="not-format">
          <div className="mb-5">
            <GuidanceGroupAddDrawerView
              handleKelBimbingan={handleKelBimbingan}
              id="0"
            />
          </div>
          <GuidanceGroupTableView
            data={data}
            selected={selected}
            setSelected={setSelected}
            handleKelBimbingan={handleKelBimbingan}
          />
          <GuidanceGroupUpdateDrawerView
            handleKelBimbingan={handleKelBimbingan}
            selected={selected}
            id="1"
          />
        </div>
      </div>
    </>
  );
}