import PropTypes from "prop-types";
import { initFlowbite } from "flowbite";
import { useEffect } from "react";
export default function Dropdown(props) {
  const { children, index, listMenu = [] } = props;

  useEffect(() => {
    initFlowbite();
  }, []);

  return (
    <>
      <button
        id={`dropdownDividerButton${index}`}
        data-dropdown-toggle={`dropdownDivider${index}`}
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        type="button"
      >
        {children}{" "}
        <svg
          className="w-2.5 h-2.5 ms-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>
      <div
        id={`dropdownDivider${index}`}
        className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600"
      >
        <ul
          className="py-2 text-sm text-gray-700 dark:text-gray-200"
          aria-labelledby={`dropdownDividerButton${index}`}
        >
          {listMenu.length != 0 &&
            listMenu.map((item, index) => (
              <li key={index}>
                <button
                  onClick={item.onClick}
                  className={`${
                    item.variant === "danger" && "text-red-600"
                  } w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white text-left font-medium`}
                >
                  {item.label}
                </button>
              </li>
            ))}
        </ul>
      </div>
    </>
  );
}

Dropdown.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number,
  listMenu: PropTypes.any,
};
