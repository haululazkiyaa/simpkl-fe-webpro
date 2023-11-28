import FillButton from "./FillButton";
import OutlineButton from "./OutlineButton";
import PropTypes from "prop-types";

export default function Button(props) {
  const { outline = false } = props;
  return (
    <>{outline ? <OutlineButton {...props} /> : <FillButton {...props} />}</>
  );
}

Button.propTypes = {
  children: PropTypes.node,
  outline: PropTypes.bool,
  type: PropTypes.string,
  onClick: PropTypes.func,
};
