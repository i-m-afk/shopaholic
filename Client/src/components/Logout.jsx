import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth";
import Spinner from "./Spinner";

const Logout = (props) => {
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();
  const location = useLocation();
  useEffect(() => {
    localStorage.removeItem("auth");
    setAuth({ ...auth, user: null, token: "" });
    setTimeout(() => {
      navigate("/");
    }, 500);
  }, []);

  return (
    <div className=" bg-slate-200 flex h-screen justify-center items-center">
      <p className="text-center text-3xl font-medium p-2">
        You have been logged Out.
      </p>
      <Spinner />
    </div>
  );
};

export default Logout;
