import { useCallback, useContext, useEffect, useState } from "react";

import AssesmentAspectAddDrawerView from "../../../views/SchoolAdmin/Assesment/AssesmentAspect/AddDrawerView";
import AssesmentAspectTableView from "../../../views/SchoolAdmin/Assesment/AssesmentAspect/TableView";
import AssesmentAspectUpdateDrawerView from "../../../views/SchoolAdmin/Assesment/AssesmentAspect/UpdateDrawerView";
import { AuthContext } from "../../../context/AuthContext";
import LearningObjectiveAddDrawerView from "../../../views/SchoolAdmin/Assesment/LearningObjective/AddDrawerView";
import LearningObjectiveTableView from "../../../views/SchoolAdmin/Assesment/LearningObjective/TableView";
import LearningObjectiveUpdateDrawerView from "../../../views/SchoolAdmin/Assesment/LearningObjective/UpdateDrawerView";
import Logout from "../../../components/Elements/Logout";
import { getAspekPenilaian } from "../../../services/school-admin/assesment-aspect.service";
import { getTujuanPembelajaran } from "../../../services/school-admin/learning-objective.service";
import { refreshToken } from "../../../services/auth/auth.service";
import { useNavigate } from "react-router-dom";

export default function SchoolAdminAssesmentPage() {
  const { setProgress } = useContext(AuthContext);
  const navigate = useNavigate();

  const [aspekPenilaian, setAspekPenilaian] = useState([]);
  const [tujuanPembelajaran, setTujuanPembelajaran] = useState([]);
  const [selected, setSelected] = useState("");

  const handleTujuanPembelajaran = useCallback(() => {
    setProgress(30);
    refreshToken((status, token) => {
      if (status) {
        setProgress(60);
        getTujuanPembelajaran(token, (status, data) => {
          if (status) {
            setTujuanPembelajaran(data);
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

  const handleAspekPenilaian = useCallback(() => {
    setProgress(30);
    refreshToken((status, token) => {
      if (status) {
        setProgress(60);
        getAspekPenilaian(token, (status, data) => {
          if (status) {
            setAspekPenilaian(data);
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
    handleTujuanPembelajaran();
    handleAspekPenilaian();
  }, [handleTujuanPembelajaran, handleAspekPenilaian]);

  return (
    <>
      <div className="format max-w-none mb-5">
        <h1 className="dark:text-white">Penilaian</h1>
        <div className="flex-none flex-row lg:flex">
          <div className="basis-2/6 lg:mr-5">
            <h2 className="dark:text-white">Penilaian Bulanan</h2>
            <p>
              Anda dapat melihat data Tujuan Pembelajaran yang sudah ada,
              menambahkan serta mengubah data Tujuan Pembelajaran. Namun Anda
              belum dapat menghapus data Tujuan Pembelajaran saat ini..
            </p>
          </div>
          <div className="basis-4/6">
            <div className="not-format">
              <div className="flex justify-between mb-5">
                <LearningObjectiveAddDrawerView
                  handleTujuanPembelajaran={handleTujuanPembelajaran}
                  id="0"
                />
              </div>
              <LearningObjectiveTableView
                tujuanPembelajaran={tujuanPembelajaran}
                handleTujuanPembelajaran={handleTujuanPembelajaran}
                setSelected={setSelected}
              />
              <LearningObjectiveUpdateDrawerView
                handleTujuanPembelajaran={handleTujuanPembelajaran}
                selected={selected}
                id="1"
              />
            </div>
          </div>
        </div>
        <hr className="border-slate-100" />
        <div className="mt-10 flex-none flex-row lg:flex">
          <div className="basis-2/6 lg:mr-5">
            <h2 className="dark:text-white">Penilaian Akhir</h2>
            <p>
              Anda dapat melihat data Aspek Penilaian yang sudah ada,
              menambahkan serta mengubah data Aspek Penilaian. Namun Anda belum
              dapat menghapus data Aspek Penilaian saat ini..
            </p>
          </div>
          <div className="basis-4/6">
            <div className="not-format">
              <div className="flex justify-between mb-5">
                <AssesmentAspectAddDrawerView
                  handleAspekPenilaian={handleAspekPenilaian}
                  id="2"
                />
              </div>
              <AssesmentAspectTableView
                aspekPenilaian={aspekPenilaian}
                handleAspekPenilaian={handleAspekPenilaian}
                setSelected={setSelected}
              />
              <AssesmentAspectUpdateDrawerView
                handleAspekPenilaian={handleAspekPenilaian}
                selected={selected}
                id="3"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
