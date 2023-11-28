import PropTypes from "prop-types";

export default function Label(props) {
  const { children, htmlFor, error } = props;
  return (
    <label
      htmlFor={htmlFor}
      className={`block mb-2 text-sm font-medium ${
        error ? "text-red-700" : "text-gray-900"
      } dark:text-white`}
    >
      {children}
    </label>
  );
}

Label.propTypes = {
  children: PropTypes.node,
  htmlFor: PropTypes.string,
  error: PropTypes.bool,
};
