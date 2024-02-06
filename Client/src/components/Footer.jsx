import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="bg-black p-2 ">
      <div className="text-cyan-50 flex text-lg justify-center">
        All Right Reserved © Charles Technologies Pvt Ltd.
      </div>
      <div>
        <ul className="text-cyan-50 flex justify-center">
          <li className="px-3 hover:text-blue-300 ">
            <Link to="/about">About us</Link>
          </li>
          ||
          <li className="px-3 hover:text-blue-300  ">
            <Link to="/contact">Contact us</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Footer;
