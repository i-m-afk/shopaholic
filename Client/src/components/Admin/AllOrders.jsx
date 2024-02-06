import React from "react";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/auth";
import axios from "axios";

const AllOrders = () => {
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();
  const [idStatMap, setIdStatMap] = useState({});
  const handleSave = async () => {
    try {
      await axios.put(`${process.env.REACT_APP_API}/api/v1/auth/order-status`, {
        idStatMap,
      });
    } catch (error) {}
  };

  const handleStatusChange = (id, value) => {
    idStatMap[id] = value;
    setIdStatMap({ ...idStatMap });
    const index = orders?.findIndex((i) => i._id === id);
    const updatedOrder = { ...orders[index], status: value };
    orders.splice(index, 1, updatedOrder);
    setOrders([...orders]);
  };
  const getOrders = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/auth/all-orders`
      );
      setOrders([...data]);
    } catch (error) {}
  };
  const createdAtDate = orders.map((i) => new Date(i?.createdAt));
  const dateFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const formattedCreatedAt = createdAtDate?.map((i) =>
    i?.toLocaleDateString("en-US", dateFormatOptions)
  );

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);
  return (
    <div>
      <h1>All orders</h1>
      <table className="min-w-full">
        <thead>
          <tr>
            <th className="px-6 py-3 text-left">Order Details</th>
            <th className="px-6 py-3 text-left">Buyer</th>
            <th className="px-6 py-3 text-left">Products</th>
            <th className="px-6 py-3 text-left">Status of Delivery</th>
          </tr>
        </thead>
        <tbody>
          {orders?.map((order, index) => (
            <tr key={index} className="bg-white">
              <td className="px-6 py-4 ">
                <div className="text-lg font-semibold">Order Details</div>
                <div className="text-gray-500">{formattedCreatedAt[index]}</div>
              </td>
              <td className="px-6 py-4 ">
                <div className="text-lg font-semibold">Buyer</div>
                <div className="text-gray-600">{order?.buyer?.name}</div>
              </td>
              <td className="px-6 py-4">
                <div className="text-lg font-semibold">Products</div>
                <ul>
                  {order?.products?.map((product, productIndex) => (
                    <li key={productIndex} className="text-gray-600">
                      {product?.name} - Rs. {product?.price}
                    </li>
                  ))}
                </ul>
              </td>
              <td className="px-6 py-4">
                <div className="text-lg font-semibold">Status</div>
                <div className="relative">
                  <select
                    className={`block appearance-none w-full bg-white border border-gray-400 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500 ${
                      order?.status === "Not Process"
                        ? "border-red-500"
                        : "border-green-500"
                    }`}
                    value={order?.status}
                    onChange={(e) =>
                      handleStatusChange(order?._id, e.target.value)
                    }
                  >
                    <option value="Processing">Processing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Not Process">Not Process</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg
                      className={`fill-current h-4 w-4 ${
                        order?.status === "Not Process"
                          ? "text-red-500"
                          : "text-green-500"
                      }`}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.293 9.293a1 1 0 011.414 0L10 10.586l1.293-1.293a1 1 0 111.414 1.414l-2 2a1 1 0 01-1.414 0l-2-2a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        className="bg-blue-500 mx-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleSave}
      >
        Save
      </button>
    </div>
  );
};

export default AllOrders;
