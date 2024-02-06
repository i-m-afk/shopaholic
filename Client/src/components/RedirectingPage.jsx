import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Spinner from "./Spinner";
import { useAuth } from "../context/auth";

const RedirectingPage = ({ path = "/login" }) => {
  const [count, setCount] = useState(5);
  const [auth] = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setCount((prevCount) => prevCount - 1);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []); // Empty dependency array ensures this effect runs only once, similar to componentDidMount

  useEffect(() => {
    if (count === 0) {
      navigate(`${path}`, { state: location.pathname });
    }
  }, [count, path, location.pathname, navigate]);

  const countView = useMemo(() => {
    return (
      <p className="text-center text-3xl font-medium p-2">
        {auth.user
          ? `Not Authorized, you don't have admin Rights. Redirecting to home page in ${count} seconds.`
          : "Kindly, log in to access user-dashboard"}
      </p>
    );
  }, [count, auth.user]);

  return (
    <div className="bg-slate-200 flex h-screen justify-center items-center">
      {countView}
      <Spinner />
    </div>
  );
};

export default RedirectingPage;
