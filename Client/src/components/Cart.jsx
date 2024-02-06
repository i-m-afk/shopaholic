import React, { useEffect, useState } from "react";
import { useCart } from "../context/cartContext";
import { Card } from "antd";

import BraintreeDropIn from "./BraintreDropIn";
function Cart() {
  const [cartItem, setCartItem] = useCart();
  const [totalPrice, setTotalPrice] = useState(0);
  const [productCount, setProductsCount] = useState(new Map());
  const [showUniquePro, setShowUniqueProducts] = useState([]);
  const [showBraintreeDropIn, setShowBraintreeDropIn] = useState(false);
  const handleRemoveFromCart = (itemID) => {
    const index = cartItem?.findIndex((obj) => obj?._id === itemID);
    cartItem.splice(index, 1);
    setCartItem([...cartItem]);
    localStorage.setItem("cart", JSON.stringify([...cartItem]));
  };
  useEffect(() => {
    setTotalPrice(cartItem?.reduce((acc, i) => (acc += i.price), 0));
    const map = new Map(); //this is for counting the dublicate products
    cartItem.length > 0 &&
      cartItem?.forEach((i) => {
        if (map.has(i._id)) map.set(i._id, map.get(i._id) + 1);
        else map.set(i._id, 1);
      });
    const set = new Set(); // this is for return unique product
    const showUniquePro = [];
    cartItem.forEach((i) => {
      if (!set.has(i._id)) {
        set.add(i._id);
        showUniquePro.push(i);
      }
    });
    setShowUniqueProducts(showUniquePro);
    setProductsCount(new Map(map));
  }, [cartItem]);
  return (
    <div className="flex flex-wrap">
      <div className="flex flex-col w-7/12">
        <h1>Cart Items</h1>
        <div>
          {showUniquePro?.length > 0 &&
            showUniquePro?.map((item, index) => (
              <Card className="flex justify-center w-[300px] h-[350px] rounded-3xl shadow-sm m-10 bg-grey-100 hover:shadow-2xl">
                <img
                  className="w-[200px] h-[200px] rounded-3xl"
                  src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${item?._id}`}
                />
                <p
                  style={{
                    fontWeight: "bold",
                    fontSize: "18px",
                    color: "blue",
                  }}
                >
                  {item?.name}
                </p>
                <p style={{ fontWeight: "bold", fontSize: "16px" }}>
                  {item?.price}
                </p>
                <div className="flex flex-row">
                  <button
                    className="bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-bl-red-500 hover:border-transparent rounded"
                    onClick={() => handleRemoveFromCart(item?._id)}
                  >
                    Remove
                  </button>
                  <p
                    style={{
                      fontWeight: "bold",
                      fontSize: "16px",
                      marginLeft: "10px",
                    }}
                  >
                    X {productCount.get(item?._id)}
                  </p>
                </div>
              </Card>
            ))}
        </div>
      </div>
      <div className="flex flex-col justify-center m-2 w-3/12">
        <h1 className="text-2xl font-bold">Cart Summary</h1>
        <h2 className="text-xl">checkout || Payment</h2>
        <hr className="w-full mt-2 mb-4 border-t-2 border-gray-400" />
        <h1 className="text-2xl font-bold">
          Total: ₹{totalPrice?.toLocaleString("en-IN")}
        </h1>
        <button
          className="bg-blue-500 w-[150px] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => setShowBraintreeDropIn(true)}
        >
          Make Payment
        </button>
        <BraintreeDropIn
          show={showBraintreeDropIn}
          onPaymentCompleted={() => {
            setShowBraintreeDropIn(false);
          }}
        />
      </div>
    </div>
  );
}

export default Cart;
