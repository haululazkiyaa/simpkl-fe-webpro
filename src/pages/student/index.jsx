import { AuthContext } from "../../context/AuthContext";
import DashboardLayout from "../../components/Layouts/DashboardLayout";
import { Outlet } from "react-router-dom";
import PropTypes from "prop-types";
import { useContext } from "react";

export default function StudentPage() {
  const { profile } = useContext(AuthContext);

  return (
    <DashboardLayout>
      {profile.role === "SISWA" ? (
        <Outlet />
      ) : (
        <div>Anda tidak memiliki akses ke halaman ini!</div>
      )}
    </DashboardLayout>
  );
}

StudentPage.propTypes = {
  children: PropTypes.node,
};
