import { Link, useLocation } from "react-router-dom";
import { GiShoppingBag } from "react-icons/gi";
import { useAuth } from "../context/auth";
import { useState } from "react";
import Dropdown from "./Dropdown";
import Searchbox from "./utils/Searchbox";
import { useCart } from "../context/cartContext";
const Header = () => {
  const [auth, setAuth] = useAuth();
  //assigning location variable
  const location = useLocation();
  //destructuring pathname from location
  const { pathname } = location;
  //Javascript split method to get the name of the path in array
  const splitLocation = pathname.split("/");
  const loc = splitLocation[1];
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [cartItem] = useCart();

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  return (
    <div className="flex justify-between shadow-2xl bg-black w-full p-1 ">
      <div className="flex flex-wrap mx-2 ">
        <a href="/">
          <GiShoppingBag color="white" size={"50px"} />
        </a>
        <h1 className="font-bold font-serif p-4 mx-4 text-white text-2xl hover: hover:text-3xl">
          ShopAholic
        </h1>
      </div>
      <div className="flex items-center text-white ">
        <ul className="flex text-lg ">
          <li
            className={
              loc === "/search"
                ? "active p-2 m-2 w-30 underline hover:text-blue-300 "
                : "p-2 m-2 w-30  hover:text-blue-300  "
            }
          >
            <Searchbox />
          </li>
          <li
            className={
              loc === ""
                ? "active p-2 m-2 w-30 underline hover:text-blue-300 "
                : "p-2 m-2 w-30  hover:text-blue-300  "
            }
          >
            <Link to="/">Home</Link>
          </li>
          <li
            className={
              loc === "category"
                ? "active p-2 m-2 w-30 underline hover:text-blue-300 "
                : "p-2 m-2 w-30 hover:text-blue-300  "
            }
          >
            <Link to="category">Category</Link>
          </li>
          <li className="p-2 m-2 w-30">
            🛒
            <Link
              className={
                loc === "cart"
                  ? "active underline hover:text-blue-300 "
                  : "hover:text-blue-300  "
              }
              to="/cart"
            >
              <span>Cart ({cartItem?.length})</span>
            </Link>
          </li>
          {auth.user === null ? (
            <li
              className={
                loc === "register"
                  ? "active p-2 m-2 w-30 underline hover:text-blue-300 "
                  : "p-2 m-2 w-30  hover:text-blue-300  "
              }
            >
              <Link to="/register">Register</Link>
            </li>
          ) : null}
          <li>
            {auth.user === null ? (
              <p
                className={
                  loc === "login"
                    ? "active p-2 m-2 w-30 underline hover:text-blue-300 "
                    : "p-2 m-2 w-30  hover:text-blue-300  "
                }
              >
                <Link to="/login">Login</Link>
              </p>
            ) : (
              <p
                onClick={toggleDropdown}
                className="cursor-pointer text-xl font-semibold p-2 m-2 w-30  hover:text-blue-300"
              >
                {auth?.user?.name} {!isDropdownVisible ? "⬇" : "⬆"}
              </p>
            )}
            {isDropdownVisible ? (
              <Dropdown toggleDropdown={toggleDropdown} />
            ) : null}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
