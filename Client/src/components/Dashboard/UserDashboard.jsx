import React from "react";
import { useAuth } from "../../context/auth";
import UserMenu from "../User/UserMenu";

const UserDashboard = ({ children }) => {
  const [auth] = useAuth();
  return (
    <div className="flex m-2">
      <div className="w-3/12">
        <UserMenu />
      </div>

      <div className="w-9/12">
        {children || <h1>Hello, {auth.user.name}</h1>}
      </div>
    </div>
  );
};

export default UserDashboard;
