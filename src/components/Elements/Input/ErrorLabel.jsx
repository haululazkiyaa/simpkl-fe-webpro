import { PropTypes } from "prop-types";
export default function ErrorLabel(props) {
  const { error = false, errMessage = "" } = props;
  return (
    <>
      {error && (
        <p className="mt-2 text-sm text-red-600 dark:text-red-500">
          <span className="font-medium">{errMessage}</span>
        </p>
      )}
    </>
  );
}

ErrorLabel.propTypes = {
  error: PropTypes.bool,
  errMessage: PropTypes.string,
};
