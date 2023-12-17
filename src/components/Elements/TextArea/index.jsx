import Label from "../Input/Label.jsx";
import { PropTypes } from "prop-types";

export default function TextArea(props) {
  const {
    label,
    name,
    id,
    value,
    onChange,
    placeholder,
    isDisabled = false,
    required = true,
    cols = 25,
    rows = 5,
  } = props;

  return (
    <>
      <Label {...props}>{label}</Label>
      <textarea
        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        name={name}
        id={id}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        rows={rows}
        cols={cols}
        value={value ? value : ""}
        disabled={isDisabled}
      />
    </>
  );
}

TextArea.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  name: PropTypes.string,
  id: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  isDisabled: PropTypes.bool,
  cols: PropTypes.number,
  rows: PropTypes.number,
};
