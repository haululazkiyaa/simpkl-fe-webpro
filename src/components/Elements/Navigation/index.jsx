import { AuthContext } from "../../../context/AuthContext";
import { NavLink } from "react-router-dom";
import { NavList } from "./NavList";
import { PropTypes } from "prop-types";
import { identifyRole } from "../Role";
import { useContext } from "react";

export default function Navigation() {
  const { profile } = useContext(AuthContext);
  const role = identifyRole(profile.role);
  return (
    <>
      {NavList.map((item, index) =>
        item.group === role ? (
          <Navigation.Group key={index} name={item.group} menu={item.child} />
        ) : (
          item.group == null && (
            <ul key={index} className="space-y-2 font-medium">
              <Navigation.Child
                label={item.label}
                href={item.href}
                icon={item.icon}
              />
            </ul>
          )
        )
      )}
    </>
  );
}

function Group(props) {
  const { name, menu = [] } = props;

  return (
    <ul className="pt-4 mt-4 space-y-2 font-medium border-t border-gray-200 dark:border-gray-700">
      <li>
        <span className="text-gray-400 ms-2 mt-2">{name}</span>
      </li>
      {menu.map((item, index) => (
        <Navigation.Child
          key={index}
          label={item.label}
          href={item.href}
          icon={item.icon}
        />
      ))}
    </ul>
  );
}

function Child(props) {
  const { label, href, icon } = props;
  return (
    <li>
      <NavLink
        to={href}
        data-drawer-hide="logo-sidebar"
        aria-controls="logo-sidebar"
        className={({ isActive, isPending }) =>
          `flex items-center p-2 rounded-lg hover:bg-gray-100 hover:text-gray-900 dark:text-white dark:hover:bg-gray-700 group ${
            isPending
              ? "text-blue-700"
              : isActive
              ? "text-blue-700"
              : "text-gray-600"
          }`
        }
      >
        <i className={`fa-solid ${icon}`}></i>
        <span className="ms-3">{label}</span>
      </NavLink>
    </li>
  );
}

Navigation.Group = Group;
Navigation.Child = Child;

Group.propTypes = {
  name: PropTypes.string,
  menu: PropTypes.array,
};

Child.propTypes = {
  label: PropTypes.string,
  href: PropTypes.string,
  icon: PropTypes.string,
};
