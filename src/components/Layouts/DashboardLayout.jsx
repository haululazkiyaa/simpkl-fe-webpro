import { useCallback, useContext, useEffect } from "react";

import { AuthContext } from "../../context/AuthContext";
import DropdownUser from "../Elements/DropdownUser";
import Logo from "../Elements/Brands/Logo";
import Logout from "../Elements/Logout";
import LogoutModal from "../Elements/Logout/LogoutModal";
import Navigation from "../Elements/Navigation";
import PropTypes from "prop-types";
import { getProfile } from "../../services/dashboard/profile.service";
import { initFlowbite } from "flowbite";
import { refreshToken } from "../../services/auth/auth.service";
import { useNavigate } from "react-router-dom";

export default function DashboardLayout(props) {
  const { children } = props;
  const { profile, setProfile, setProgress } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    initFlowbite();
  }, []);

  const handleGetProfile = useCallback(
    (token) => {
      getProfile(token, (status, profile) => {
        if (status) {
          setProfile(profile);
        }
      });
      setProgress(100);
    },
    [setProfile, setProgress]
  );

  const handleRefreshToken = useCallback(() => {
    setProgress(30);
    refreshToken((status, token) => {
      setProgress(60);
      if (status) {
        handleGetProfile(token);
      } else {
        Logout((status) => {
          if (status) {
            navigate("/login");
          }
        });
      }
      setProgress(100);
    });
  }, [setProgress, handleGetProfile, navigate]);

  useEffect(() => {
    handleRefreshToken();
  }, [handleRefreshToken]);

  return (
    <>
      <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start rtl:justify-end">
              <button
                onClick={() => {
                  const elmt = document.querySelector("div[drawer-backdrop]");
                  if (elmt) {
                    elmt.style.backgroundColor = "rgb(107 114 128 / 0.5)";
                  }
                }}
                data-drawer-target="logo-sidebar"
                data-drawer-toggle="logo-sidebar"
                aria-controls="logo-sidebar"
                type="button"
                className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              >
                <span className="sr-only">Open sidebar</span>
                <svg
                  className="w-6 h-6"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    clipRule="evenodd"
                    fillRule="evenodd"
                    d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                  ></path>
                </svg>
              </button>
              <Logo />
            </div>
            <DropdownUser profile={profile} />
          </div>
        </div>
      </nav>

      <aside
        id="logo-sidebar"
        className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
          <Navigation />
        </div>
      </aside>

      <div className="p-4 sm:ml-64">
        <div className="p-4 mt-14">{children}</div>
      </div>
      <LogoutModal />
    </>
  );
}

DashboardLayout.propTypes = {
  children: PropTypes.node,
};
