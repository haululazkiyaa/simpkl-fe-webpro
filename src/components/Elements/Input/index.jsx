import ErrorLabel from "./ErrorLabel";
import InputDefault from "./InputDefault";
import Label from "./Label";
import { PropTypes } from "prop-types";

export default function Input(props) {
  const { label } = props;
  return (
    <div>
      <Label {...props}>{label}</Label>
      <InputDefault {...props} />
      <ErrorLabel {...props} />
    </div>
  );
}

Input.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
};
