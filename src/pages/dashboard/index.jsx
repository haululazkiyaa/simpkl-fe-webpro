import DashboardLayout from "../../components/Layouts/DashboardLayout";
import PropTypes from "prop-types";

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <p>Dashboard</p>
    </DashboardLayout>
  );
}

DashboardPage.propTypes = {
  handleLogout: PropTypes.func,
};
