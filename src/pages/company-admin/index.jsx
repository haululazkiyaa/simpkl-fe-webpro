import { AuthContext } from "../../context/AuthContext";
import DashboardLayout from "../../components/Layouts/DashboardLayout";
import { Outlet } from "react-router-dom";
import PropTypes from "prop-types";
import { useContext } from "react";

export default function CompanyAdminPage() {
  const { profile } = useContext(AuthContext);
  {
    console.log();
  }
  return (
    <DashboardLayout>
      {profile.role === "PERUSAHAAN" ? (
        <Outlet />
      ) : (
        <div>Anda tidak memiliki akses ke halaman ini!</div>
      )}
    </DashboardLayout>
  );
}

CompanyAdminPage.propTypes = {
  children: PropTypes.node,
};
