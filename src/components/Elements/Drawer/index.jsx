import { useEffect, useState } from "react";

import Button from "../Button";
import PropTypes from "prop-types";
import { initFlowbite } from "flowbite";

export default function Drawer(props) {
  const { children, title, id = "" } = props;
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    initFlowbite();
  }, []);

  return (
    <>
      <div
        hidden={hidden}
        className="bg-gray-900/50 dark:bg-gray-900/80 fixed inset-0 z-50"
        style={{ backgroundColor: "rgba(107, 114, 128, 0.5)" }}
      ></div>
      <button
        id={"init-drawer" + id}
        onClick={() => {
          setHidden(!hidden);
          const elmt = document.querySelector("div[drawer-backdrop]");
          if (elmt) {
            elmt.style.backgroundColor = "rgb(107 114 128 / 0)";
            // elmt.classList.replace("z-30", "z-50");
          }
        }}
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        type="button"
        data-drawer-target={"drawer" + id}
        data-drawer-show={"drawer" + id}
        data-drawer-placement="right"
        aria-controls={"drawer" + id}
        hidden
      >
        Show right drawer
      </button>
      <div
        id={"drawer" + id}
        className="fixed top-0 right-0 z-[60] h-screen p-4 overflow-y-auto transition-transform translate-x-full bg-white w-full sm:w-2/4 lg:w-1/4 dark:bg-gray-800"
        tabIndex="-1"
        aria-labelledby={"drawer-label" + id}
      >
        <h5
          id={"drawer-label" + id}
          className="inline-flex items-center mb-4 text-base font-semibold text-gray-500 dark:text-gray-400"
        >
          {title}
        </h5>
        <button
          onClick={() => {
            setHidden(!hidden);
          }}
          id={"reset-drawer" + id}
          type="button"
          data-drawer-hide={"drawer" + id}
          aria-controls={"drawer" + id}
          className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-2.5 end-2.5 inline-flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white"
        >
          <svg
            className="w-3 h-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
            />
          </svg>
          <span className="sr-only">Close menu</span>
        </button>
        {children}
        <button
          onClick={() => {
            setHidden(!hidden);
          }}
          id={"reset-drawer" + id}
          type="button"
          data-drawer-hide={"drawer" + id}
          aria-controls={"drawer" + id}
          className="mt-3 w-full text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
        >
          Tutup
        </button>
      </div>
    </>
  );
}

Drawer.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
  id: PropTypes.string,
};
