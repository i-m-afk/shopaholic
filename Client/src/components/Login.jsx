import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../context/auth";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Login = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [auth, setAuth] = useAuth();
  function togglePasswordVisibility() {
    setIsPasswordVisible(!isPasswordVisible);
  }
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      onSubmit={async (values) => {
        try {
          const response = await axios.post(
            `${process.env.REACT_APP_API}/api/v1/auth/login`,
            values
          );
          setAuth({
            ...auth,
            user: response.data.user,
            token: response.data.token,
          });

          toast.success(response.data.message);
          localStorage.setItem("auth", JSON.stringify(response.data));
          navigate(location.state || "/"); //it will take you to prev path if user is been redirected else if first time then it will go to / home
        } catch (error) {
          toast.error(error.response.data.message);
        }
      }}
    >
      {({ handleSubmit }) => (
        <Form className="m-0" onSubmit={handleSubmit}>
          <section className="bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
              <a
                href="#"
                className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
              >
                ShopAholic
              </a>
              <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                  <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                    Sign in to your account
                  </h1>

                  <div>
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Your email
                    </label>
                    <Field
                      type="email"
                      name="email"
                      id="email"
                      className="bg-gray-50 border px-4 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                      placeholder="name@company.com"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="password"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Password
                    </label>
                    <div className="flex">
                      <Field
                        type={isPasswordVisible ? "text" : "password"}
                        name="password"
                        id="password"
                        placeholder="••••••••"
                        className="bg-gray-50 border px-4 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                      />

                      <span
                        className=" py-2 px-2 text-xl rounded hover:cursor-pointer "
                        onClick={togglePasswordVisibility}
                      >
                        {isPasswordVisible ? "✋" : "👁"}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <Link
                      className="text-sm font-medium text-primary-600 text-cyan-200"
                      to="/forgot-password"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <div className="inline-flex items-end">
                    <button
                      type="submit"
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                      Log in
                    </button>
                  </div>
                  <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                    Don’t have an account yet?{" "}
                    <a
                      href="#"
                      className="text-sm font-medium text-primary-600 text-cyan-200"
                    >
                      Sign up
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </section>
        </Form>
      )}
    </Formik>
  );
};

export default Login;
