import PropTypes from "prop-types";
export default function Credit(props) {
  const { center = true } = props;
  return (
    <div
      className={`flex items-center ${
        center ? "justify-center" : "justify-start"
      } m-3`}
    >
      <img src="/images/logo.png" alt="Logo" className="h-8" />
      <span className="text-center text-sm p-3 text-gray-400">
        {import.meta.env.VITE_APP_VERSION}
        {" | Hak Cipta ©2024"}
      </span>
    </div>
  );
}

Credit.propTypes = {
  center: PropTypes.bool,
  detail: PropTypes.bool,
};
