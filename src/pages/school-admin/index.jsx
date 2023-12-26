import { AuthContext } from "../../context/AuthContext";
import DashboardLayout from "../../components/Layouts/DashboardLayout";
import { Outlet } from "react-router-dom";
import PropTypes from "prop-types";
import { useContext } from "react";

export default function SchoolAdminPage() {
  const { profile } = useContext(AuthContext);

  return (
    <DashboardLayout>
      {profile.role === "ADMINSEKOLAH" ? (
        <Outlet />
      ) : (
        <div>Anda tidak memiliki akses ke halaman ini!</div>
      )}
    </DashboardLayout>
  );
}

SchoolAdminPage.propTypes = {
  children: PropTypes.node,
};
