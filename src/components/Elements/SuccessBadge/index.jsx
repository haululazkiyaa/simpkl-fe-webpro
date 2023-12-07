import Button from "../Button";
import PropTypes from "prop-types";

export default function SuccessBadge(props) {
  const { children, id = "" } = props;

  const initDrawer = () => {
    document.getElementById("reset-drawer" + id).click();
  };

  return (
    <div className="p-4 w-full text-center">
      <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900 p-2 flex items-center justify-center mx-auto mb-3.5">
        <svg
          aria-hidden="true"
          className="w-8 h-8 text-green-500 dark:text-green-400"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
            clipRule="evenodd"
          ></path>
        </svg>
        <span className="sr-only">Success</span>
      </div>
      <p className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
        {children}
      </p>
      <Button outline={true} onClick={() => initDrawer()}>
        Tutup
      </Button>
    </div>
  );
}

SuccessBadge.propTypes = {
  children: PropTypes.node,
  id: PropTypes.string,
};
