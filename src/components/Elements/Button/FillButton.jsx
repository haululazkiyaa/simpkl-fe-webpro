import PropTypes from "prop-types";
export default function FillButton(props) {
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
          className={`${classWidth()} focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg ${size} px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800`}
        >
          {children}
        </button>
      ) : variant === "red" ? (
        <button
          disabled={disabled}
          type={type}
          onClick={onClick}
          className={`${classWidth()} focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg ${size} px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900`}
        >
          {children}
        </button>
      ) : variant === "yellow" ? (
        <button
          disabled={disabled}
          type={type}
          onClick={onClick}
          className={`${classWidth()} focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg ${size} px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900`}
        >
          {children}
        </button>
      ) : variant === "purple" ? (
        <button
          disabled={disabled}
          type={type}
          onClick={onClick}
          className={`${classWidth()} focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg ${size} px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900`}
        >
          {children}
        </button>
      ) : (
        <button
          disabled={disabled}
          type={type}
          onClick={onClick}
          className={`${classWidth()} text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg ${size} px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800`}
        >
          {children}
        </button>
      )}
    </>
  );
}

FillButton.propTypes = {
  children: PropTypes.node,
  variant: PropTypes.oneOf(["default", "green", "red", "yellow", "purple"]),
  disabled: PropTypes.bool,
  type: PropTypes.oneOf(["button", "submit"]),
  width: PropTypes.oneOf(["auto", "full", "responsive"]),
  size: PropTypes.string,
  onClick: PropTypes.func,
};
