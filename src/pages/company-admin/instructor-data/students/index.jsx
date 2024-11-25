import { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { AuthContext } from "../../../../context/AuthContext";
import InstructorStudentDataTableView from "../../../../views/CompanyAdmin/InstructorData/Students/TableView";
import Logout from "../../../../components/Elements/Logout";
import { getKelBimbinganPerusahaanByInstruktur } from "../../../../services/company-admin/company-guidance-group.service";
import { refreshToken } from "../../../../services/auth/auth.service";

export default function CompanyAdminInstructorStudentDataPage() {
  const { InstructorId } = useParams();
  const { setProgress } = useContext(AuthContext);
  const navigate = useNavigate();

  const [data, setData] = useState([]);

  const handleDataDetailInstruktur = useCallback(() => {
    setProgress(30);
    refreshToken((status, token) => {
      if (status) {
        setProgress(60);
        getKelBimbinganPerusahaanByInstruktur(
          InstructorId,
          token,
          (status, data) => {
            if (status) {
              setData(data);
            }
          }
        );
      } else {
        Logout((status) => {
          if (status) {
            navigate("/login");
          }
        });
      }
      setProgress(100);
    });
  }, [InstructorId, setProgress, navigate]);

  useEffect(() => {
    handleDataDetailInstruktur();
  }, [handleDataDetailInstruktur]);

  return (
    <>
      <div className="format max-w-none mb-5">
        <h1 className="dark:text-white">Daftar Siswa Bimbingan</h1>
        <p>
          Anda dapat meilhat data instruktur yang ada atau menambahkan data
          instruktur baru atau mengubah data instruktur yang ada. Namun, anda
          tidak dapat menghapus data instruktur yang sudah ditambahkan.
        </p>
        <div className="not-format">
          <InstructorStudentDataTableView
            data={data}
            handleDataDetailInstruktur={handleDataDetailInstruktur}
          />
        </div>
      </div>
    </>
  );
}
