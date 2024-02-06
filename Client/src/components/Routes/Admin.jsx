// import { useEffect, useState } from "react";
// import { useAuth } from "../../context/auth";
// import { Outlet } from "react-router-dom";
// import axios from "axios";
// import RedirectingPage from "../RedirectingPage";
// const Admin = () => {
//   const [ok, setOk] = useState(false);
//   const [auth, setAuth] = useAuth();
//   const authCheck = async () => {
//     try {
//       const res = await axios.get(
//         `${process.env.REACT_APP_API}/api/v1/auth/admin-auth`
//       );
//       setOk(true);
//     } catch (err) {
//       setOk(false);
//     }
//   };

//   useEffect(() => {
//     if (auth?.token) authCheck();
//   }, [auth?.token]);

//   return ok ? <Outlet /> : <RedirectingPage />;
// };

// export default Admin;
