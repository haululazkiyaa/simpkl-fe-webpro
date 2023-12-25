import { PropTypes } from "prop-types";

export default function InputDefault(props) {
  const {
    type = "text",
    name,
    id,
    placeholder,
    value,
    onChange,
    required = false,
    error = false,
    isDisabled = false,
  } = props;
  return (
    <input
      type={type}
      name={name}
      id={id}
      className={
        error
          ? "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-red-100 dark:border-red-400"
          : `bg-gray-50 border border-gray-300 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
              isDisabled ? "text-gray-400" : "text-gray-900 "
            }`
      }
      placeholder={placeholder}
      value={value ? value : ""}
      onChange={onChange}
      required={required}
      disabled={isDisabled}
    />
  );
}

InputDefault.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string,
  id: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.any,
  onChange: PropTypes.func,
  required: PropTypes.bool,
  error: PropTypes.bool,
  isDisabled: PropTypes.bool,
};
