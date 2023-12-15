import Label from "../Input/Label.jsx";
import { PropTypes } from "prop-types";
import Select from "react-select";

export default function SelectInput(props) {
  const {
    options = [],
    label,
    onChange,
    defaultValue,
    isDisabled = false,
    required = true,
  } = props;

  return (
    <>
      <Label {...props}>{label}</Label>

      <Select
        styles={{
          container: (baseStyles) => ({
            ...baseStyles,
            marginTop: "0px !important",
          }),
          control: (baseStyles, state) => ({
            ...baseStyles,
            backgroundColor: "rgb(249, 250, 251)",
            borderColor: state.isFocused
              ? "rgb(63, 131, 248)"
              : "rgb(209, 213, 219)",
            borderWidth: "1px",
            borderRadius: "0.5rem",
          }),
          input: (baseStyles) => ({
            ...baseStyles,
            "input:focus": {
              boxShadow: "none",
            },
            fontSize: "0.875rem",
          }),
          placeholder: (baseStyles) => ({
            ...baseStyles,
            fontSize: "0.875rem",
          }),
          menu: (baseStyles) => ({
            ...baseStyles,
            fontSize: "0.875rem",
            borderRadius: "0.5rem",
          }),
          singleValue: (baseStyles) => ({
            ...baseStyles,
            fontSize: "0.875rem",
          }),
        }}
        options={options}
        onChange={onChange}
        defaultValue={defaultValue}
        required={required}
        isDisabled={isDisabled}
      />
    </>
  );
}

SelectInput.propTypes = {
  options: PropTypes.any,
  label: PropTypes.string,
  onChange: PropTypes.func,
  defaultValue: PropTypes.any,
  required: PropTypes.bool,
  isDisabled: PropTypes.bool,
};
