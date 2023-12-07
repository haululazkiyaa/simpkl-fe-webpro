import "./index.css";
import "react-toastify/dist/ReactToastify.min.css";

import { Flip, ToastContainer } from "react-toastify";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import AuthContextProvider from "./context/AuthContext.jsx";
import CompanyAdminPage from "./pages/company-admin/index.jsx";
import DashboardPage from "./pages/dashboard/index.jsx";
import ErrorPage from "./pages/error.jsx";
import LoginPage from "./pages/auth/login.jsx";
import React from "react";
import ReactDOM from "react-dom/client";
import RegisterPage from "./pages/auth/regsiter.jsx";
import SchoolAdminMajorManagementPage from "./pages/school-admin/major-management/index.jsx";
import SchoolAdminPage from "./pages/school-admin/index.jsx";
import SchoolAdminSettingsPage from "./pages/school-admin/settings.jsx/index.jsx";
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
    ],
  },
  {
    element: <CompanyAdminPage />,
    children: [
      {
        path: "company-admin/profile",
        element: <DashboardPage />,
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
