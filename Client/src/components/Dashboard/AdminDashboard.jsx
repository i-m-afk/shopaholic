import React from "react";
import AdminMenu from "../Admin/AdminMenu";
import { useAuth } from "../../context/auth";

const AdminDashBoard = ({ children }) => {
  const [auth] = useAuth();
  return (
    <div className="flex m-2">
      <div className="w-3/12">
        <AdminMenu />
      </div>

      <div className="w-9/12">
        {children || <h1>Hello, {auth.user.name}</h1>}
      </div>
    </div>
  );
};

export default AdminDashBoard;
