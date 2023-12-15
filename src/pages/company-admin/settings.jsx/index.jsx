import { useCallback, useContext, useEffect } from "react";

import { AuthContext } from "../../../context/AuthContext";
import Button from "../../../components/Elements/Button";
import CompanyProfileTableView from "../../../views/CompanyAdmin/Settings/ProfileSettings/TableView";
import CompanyProfileUpdateDrawerView from "../../../views/CompanyAdmin/Settings/ProfileSettings/UpdateDrawerView";
import Logout from "../../../components/Elements/Logout";
import { getProfile } from "../../../services/dashboard/profile.service";
import { refreshToken } from "../../../services/auth/auth.service";
import { useNavigate } from "react-router-dom";

export default function CompanyAdminSettingsPage() {
  const { profile, setProfile, setProgress } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleProfilPerusahaan = useCallback(() => {
    setProgress(30);
    refreshToken((status, token) => {
      if (status) {
        setProgress(60);
        getProfile(token, (status, profile) => {
          if (status) {
            setProfile(profile);
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
  }, [setProgress, setProfile, navigate]);

  useEffect(() => {
    handleProfilPerusahaan();
  }, [handleProfilPerusahaan]);

  const updateDrawer = () => {
    document.getElementById("update-drawer1").click();
  };

  return (
    <>
      <div className="format max-w-none mb-5">
        <h1>Profil Perusaahaan</h1>
        <div className="flex-none flex-row lg:flex">
          <div className="basis-2/6 lg:mr-5">
            <h2>Informasi Umum</h2>
            <p>
              Anda dapat mengubah profil perusahaan melalui halaman ini. Data
              pada aplikasi akan ditampilkan sesuai data yang anda inputkan.
            </p>
            <div className="not-format">
              <Button width="full" onClick={() => updateDrawer()}>
                Update Profile
              </Button>
              <CompanyProfileUpdateDrawerView
                handleProfilPerusahaan={handleProfilPerusahaan}
                id="1"
              />
            </div>
          </div>
          <div className="basis-4/6">
            <div className="not-format">
              <CompanyProfileTableView
                profile={profile}
                handleProfilPerusahaan={handleProfilPerusahaan}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
