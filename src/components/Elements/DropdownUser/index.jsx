import ListMenu from "./ListMenu";
import PropTypes from "prop-types";
import UserInfo from "./UserInfo";
import { identifyRole } from "../Role";

export default function DropdownUser(props) {
  const { profile } = props;

  return (
    <div className="flex items-center">
      <div className="flex items-center ms-3">
        <div>
          <button
            type="button"
            className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
            aria-expanded="false"
            data-dropdown-toggle="dropdown-user"
          >
            <span className="sr-only">Open user menu</span>
            <img
              className="w-8 h-8 rounded-full"
              src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
              alt="user photo"
            />
          </button>
        </div>
        <div
          className="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600"
          id="dropdown-user"
        >
          <UserInfo
            name={profile?.dataPengguna?.nama}
            role={identifyRole(profile?.role)}
          />
          <ListMenu menu={[{ href: "/", label: "Edit Profil" }]} />
        </div>
      </div>
    </div>
  );
}

DropdownUser.propTypes = {
  profile: PropTypes.any,
};
