import PropTypes from "prop-types";
export default function OutlineButton(props) {
  const {
    children,
    variant = "default",
    disabled = false,
    type = "button",
    width = "auto",
    size = "text-sm",
    onClick,
  } = props;

  const classWidth = () => {
    if (width === "full") {
      return "w-full";
    } else if (width === "responsive") {
      return "w-full sm:w-auto";
    } else {
      return "w-auto";
    }
  };

  return (
    <>
      {variant === "green" ? (
        <button
          disabled={disabled}
          type={type}
          onClick={onClick}
          className={`${classWidth()} text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg ${size} px-5 py-2.5 text-center me-2 mb-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800`}
        >
          {children}
        </button>
      ) : variant === "red" ? (
        <button
          disabled={disabled}
          type={type}
          onClick={onClick}
          className={`${classWidth()} text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg ${size} px-5 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900`}
        >
          {children}
        </button>
      ) : variant === "yellow" ? (
        <button
          disabled={disabled}
          type={type}
          onClick={onClick}
          className={`${classWidth()} text-yellow-400 hover:text-white border border-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg ${size} px-5 py-2.5 text-center me-2 mb-2 dark:border-yellow-300 dark:text-yellow-300 dark:hover:text-white dark:hover:bg-yellow-400 dark:focus:ring-yellow-900`}
        >
          {children}
        </button>
      ) : variant === "purple" ? (
        <button
          disabled={disabled}
          type={type}
          onClick={onClick}
          className={`${classWidth()} text-purple-700 hover:text-white border border-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg ${size} px-5 py-2.5 text-center me-2 mb-2 dark:border-purple-400 dark:text-purple-400 dark:hover:text-white dark:hover:bg-purple-500 dark:focus:ring-purple-900`}
        >
          {children}
        </button>
      ) : (
        <button
          disabled={disabled}
          type={type}
          onClick={onClick}
          className={`${classWidth()} text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg ${size} px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800`}
        >
          {children}
        </button>
      )}
    </>
  );
}

OutlineButton.propTypes = {
  children: PropTypes.node,
  variant: PropTypes.oneOf(["default", "green", "red", "yellow", "purple"]),
  disabled: PropTypes.bool,
  type: PropTypes.oneOf(["button", "submit"]),
  width: PropTypes.oneOf(["auto", "full", "responsive"]),
  size: PropTypes.string,
  onClick: PropTypes.func,
};
