import React from "react";
import { useAuth } from "../context/auth";
import { Link } from "react-router-dom";

const Dropdown = ({ toggleDropdown }) => {
  const [auth] = useAuth();
  return (
    <div
      className="absolute right-0 z-10 p-2 m-2 w-30 mt-2 bg-black origin-top-right rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
      role="menu"
      aria-orientation="vertical"
      aria-labelledby="menu-button"
      tabIndex={-1}
    >
      <div className="py-1" role="none">
        <Link
          className="text-white  block px-4 py-2 hover:underline"
          to={
            auth?.user?.role === "admin"
              ? "/admin-dashboard"
              : "/user-dashboard"
          }
          onClick={toggleDropdown}
        >
          Dashboard
        </Link>

        <Link
          className="text-white  hover:underline block px-4 py-2"
          to="/logout"
          onClick={toggleDropdown}
        >
          Log out
        </Link>
      </div>
    </div>
  );
};

export default Dropdown;
