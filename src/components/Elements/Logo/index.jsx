import { Link } from "react-router-dom";

export default function Logo() {
  return (
    <Link
      to="/"
      className="flex items-center text-2xl font-semibold text-gray-900 dark:text-white"
    >
      <img
        className="w-auto h-8 mr-2"
        src={import.meta.env.VITE_APP_LOGO_URL}
        alt="logo"
      />
      {import.meta.env.VITE_APP_LOGO_TITLE}
    </Link>
  );
}
