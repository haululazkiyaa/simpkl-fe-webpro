import "./index.css";
import "react-toastify/dist/ReactToastify.min.css";

import { Flip, ToastContainer } from "react-toastify";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import AuthContextProvider from "./context/AuthContext.jsx";
import CompanyAdminGuidanceGroupPage from "./pages/company-admin/guidance-group/index.jsx";
import CompanyAdminInstructorDataPage from "./pages/company-admin/instructor-data/index.jsx";
import CompanyAdminInstructorStudentDataPage from "./pages/company-admin/instructor-data/students/index.jsx";
import CompanyAdminPage from "./pages/company-admin/index.jsx";
import CompanyAdminProfilePage from "./pages/company-admin/profile.jsx/index.jsx";
import DashboardPage from "./pages/dashboard/index.jsx";
import ErrorPage from "./pages/error.jsx";
import LoginPage from "./pages/auth/login.jsx";
import React from "react";
import ReactDOM from "react-dom/client";
import RegisterPage from "./pages/auth/regsiter.jsx";
import SchoolAdminGuidanceGroupPage from "./pages/school-admin/guidance-group/index.jsx";
import SchoolAdminMajorManagementPage from "./pages/school-admin/major-management/index.jsx";
import SchoolAdminPage from "./pages/school-admin/index.jsx";
import SchoolAdminSettingsPage from "./pages/school-admin/settings.jsx/index.jsx";
import SchoolAdminStudentDataPage from "./pages/school-admin/student-data/index.jsx";
import SchoolAdminSupervisorDataPage from "./pages/school-admin/supervisor-data/index.jsx";

const router = createBrowserRouter([
  { path: "/", element: <DashboardPage />, errorElement: <ErrorPage /> },
  { path: "login", element: <LoginPage /> },
  { path: "register", element: <RegisterPage /> },
  {
    element: <SchoolAdminPage />,
    children: [
      {
        path: "school-admin/settings",
        element: <SchoolAdminSettingsPage />,
      },
      {
        path: "school-admin/major-management",
        element: <SchoolAdminMajorManagementPage />,
      },
      {
        path: "school-admin/supervisor-data",
        element: <SchoolAdminSupervisorDataPage />,
      },
      {
        path: "school-admin/student-data",
        element: <SchoolAdminStudentDataPage />,
      },
      {
        path: "school-admin/guidance-group",
        element: <SchoolAdminGuidanceGroupPage />,
      },
    ],
  },
  {
    element: <CompanyAdminPage />,
    children: [
      {
        path: "company-admin/profile",
        element: <CompanyAdminProfilePage />,
      },
      {
        path: "company-admin/instructor-data",
        element: <CompanyAdminInstructorDataPage />,
      },
      {
        path: "company-admin/instructor-data/:InstructorId",
        element: <CompanyAdminInstructorStudentDataPage />,
      },
      {
        path: "company-admin/guidance-group",
        element: <CompanyAdminGuidanceGroupPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthContextProvider>
      <ToastContainer transition={Flip} position="top-left" theme="colored" />
      <RouterProvider router={router} />
    </AuthContextProvider>
  </React.StrictMode>
);
