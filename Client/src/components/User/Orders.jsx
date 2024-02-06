import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/auth";
import axios from "axios";
const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();
  const getOrders = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/auth/orders`
      );
      setOrders([...data]);
    } catch (error) {}
  };
  // {orders?.length>0 && orders?.map(item=>
  // <div>
  // <h1>{item.name}</h1>
  // </div>
  // )}
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
            <th className="px-6 py-3 text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          {orders?.map((order, index) => (
            <tr key={index} className="bg-white">
              <td className="px-6 py-4">
                <div className="text-lg font-semibold">Order Details</div>
                <div className="text-gray-500">{formattedCreatedAt[index]}</div>
              </td>
              <td className="px-6 py-4">
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
                <div className="text-lg font-semibold">{order?.status}</div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Orders;
