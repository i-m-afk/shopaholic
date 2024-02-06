import { useEffect, useMemo, useState } from "react";
import { useAuth } from "../../context/auth";
import { Outlet, useLocation } from "react-router-dom";
import axios from "axios";
import RedirectingPage from "../RedirectingPage";

// note admin can access user and admin both dashboards

export const Protected = ({ checkFor }) => {
  const [permitted, setPermitted] = useState(false);
  const [auth] = useAuth();
  const [path, setPath] = useState();
  const authCheck = async () => {
    if (checkFor === "admin") {
      try {
        await axios.get(`${process.env.REACT_APP_API}/api/v1/auth/admin-auth`);
        setPermitted(true);
      } catch (error) {
        setPath("/"); //redirect to home
        setPermitted(false);
      }
    } else {
      const res = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/auth/user-auth`
      );
      if (res.data.ok) {
        setPermitted(true);
      } else {
        setPath("/login"); //redirect to home
        setPermitted(false);
      }
    }
  };

  useMemo(() => {
    if (auth.user && auth?.token) {
      authCheck();
    }
  }, [auth]);
  return permitted ? <Outlet /> : <RedirectingPage path={path} />;
};
