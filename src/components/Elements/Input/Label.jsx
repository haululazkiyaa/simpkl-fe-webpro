import PropTypes from "prop-types";

export default function Label(props) {
  const { children, id, error } = props;
  return (
    <label
      htmlFor={id}
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
  id: PropTypes.string,
  error: PropTypes.bool,
};
