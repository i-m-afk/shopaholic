import React from "react";
import { Link, useLocation } from "react-router-dom";

const AdminMenu = () => {
  const location = useLocation();

  const { pathname } = location;

  return (
    <div className="m-3 p-2">
      <table className="border-separate border-spacing-2 border-slate-500">
        <thead>
          <tr>
            <th className="bg-blue-100 border text-3xl text-center px-8 py-4">
              Admin Panel
            </th>
          </tr>
        </thead>
        <tbody className="text-black text-center">
          <tr
            className={
              pathname === "/admin-dashboard/createCategory"
                ? "bg-blue-300 font-arial text-xl"
                : "bg-white hover:bg-gray-200"
            }
          >
            <td className="border  py-4">
              <Link to="/admin-dashboard/createCategory">
                <div className="cursor-pointer">Create Category</div>
              </Link>
            </td>
          </tr>
          <tr
            className={
              pathname === "/admin-dashboard/createProduct"
                ? "bg-blue-300 font-arial text-xl"
                : "bg-white hover:bg-gray-200"
            }
          >
            <td className="border py-4">
              <Link to="/admin-dashboard/createProduct">
                <div className="cursor-pointer">Create Product</div>
              </Link>
            </td>
          </tr>
          <tr
            className={
              pathname === "/admin-dashboard/products"
                ? "bg-blue-300 font-arial text-xl"
                : "bg-white hover:bg-gray-200"
            }
          >
            <td className="border py-4">
              <Link to="/admin-dashboard/products">
                <div className="cursor-pointer">Products</div>
              </Link>
            </td>
          </tr>
          <tr
            className={
              pathname === "/admin-dashboard/delete-product"
                ? "bg-blue-300 font-arial text-xl"
                : "bg-white hover:bg-gray-200"
            }
          >
            <td className="border py-4">
              <Link to="/admin-dashboard/delete-product">
                <div className="cursor-pointer">Delete Product</div>
              </Link>
            </td>
          </tr>
          <tr
            className={
              pathname === "/admin-dashboard/Users"
                ? "bg-blue-300 font-arial text-xl"
                : "bg-white hover:bg-gray-200"
            }
          >
            <td className="border py-4">
              <Link to="/admin-dashboard/Users">
                <div className="cursor-pointer">Users</div>
              </Link>
            </td>
          </tr>
          <tr
            className={
              pathname === "/admin-dashboard/Users"
                ? "bg-blue-300 font-arial text-xl"
                : "bg-white hover:bg-gray-200"
            }
          >
            <td className="border py-4">
              <Link to="/admin-dashboard/all-orders">
                <div className="cursor-pointer">All Orders</div>
              </Link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default AdminMenu;
