import PropTypes from "prop-types";
export default function Credit(props) {
  const { center = true, detail = false } = props;
  return (
    <div
      className={`flex items-center ${
        center ? "justify-center" : "justify-start"
      } m-3`}
    >
      <img src="/images/icon.png" alt="Logo Sispensim" className="h-8" />
      <span className="text-center text-sm p-3 text-gray-400">
        {import.meta.env.VITE_CREDIT_TEXT}
        {detail && " - Hak Cipta (c)2023"}
      </span>
    </div>
  );
}

Credit.propTypes = {
  center: PropTypes.bool,
  detail: PropTypes.bool,
};
