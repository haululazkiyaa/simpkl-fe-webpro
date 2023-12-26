import { AuthContext } from "../../context/AuthContext";
import DashboardLayout from "../../components/Layouts/DashboardLayout";
import { Outlet } from "react-router-dom";
import PropTypes from "prop-types";
import { useContext } from "react";

export default function InstructorPage() {
  const { profile } = useContext(AuthContext);

  return (
    <DashboardLayout>
      {profile.role === "INSTRUKTUR" ? (
        <Outlet />
      ) : (
        <div>Anda tidak memiliki akses ke halaman ini!</div>
      )}
    </DashboardLayout>
  );
}

InstructorPage.propTypes = {
  children: PropTypes.node,
};
