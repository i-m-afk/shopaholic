import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Helmet } from "react-helmet";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Layout = ({ children, title, description, keywords, author }) => {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
      </Helmet>
      <div className="flex flex-col min-h-screen">
        <div className="top-0 z-50 bg-white shadow-md">
          <Header />
        </div>
        <main className="flex-grow">
          <ToastContainer autoClose="1000" position="bottom-left" />
          {children}
        </main>
        <div className="mt-auto">
          <Footer />
        </div>
      </div>
    </>
  );
};
Layout.defaultProps = {
  title: "Ecommerce app",
  description: "mern stack project",
  keywords: "mern,react,node,mongoDb",
  author: "Hrithik Raj",
};
export default Layout;
