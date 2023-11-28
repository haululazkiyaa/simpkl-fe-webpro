import { PropTypes } from "prop-types";

export default function UserInfo(props) {
  const { name = "~ No name ~", role = "~ No role ~" } = props;
  return (
    <div className="px-4 py-3" role="none">
      <p
        className="text-sm font-medium text-gray-900 dark:text-white"
        role="none"
      >
        {name}
      </p>
      <p
        className="text-sm text-gray-900 truncate dark:text-gray-300"
        role="none"
      >
        {role}
      </p>
    </div>
  );
}

UserInfo.propTypes = {
  name: PropTypes.string,
  role: PropTypes.string,
};
