import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { useAuth } from "../context/auth";
import { toast } from "react-toastify";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  function togglePasswordVisibility() {
    setIsPasswordVisible(!isPasswordVisible);
  }
  const navigate = useNavigate();
  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
        confirmPassword: "",
        securityAnswer: "",
      }}
      onSubmit={async (values) => {
        try {
          const response = await axios.post(
            `${process.env.REACT_APP_API}/api/v1/auth/forgot-password`,
            values
          );
          if (response.data.success) {
            toast.success(response.data.message);
            navigate("/login");
          } else {
            toast.error(response.data.message);
          }
        } catch (error) {
          toast.error(error.response.data.message);
        }
      }}
    >
      {({ handleSubmit, values }) => (
        <Form onSubmit={handleSubmit}>
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
                    Forgot Password
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
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="name@company.com"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="password"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      New Password
                    </label>
                    <div className="flex">
                      <Field
                        type={isPasswordVisible ? "text" : "password"}
                        name="password"
                        id="password"
                        placeholder="New Password"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500"
                      />

                      <span
                        className="text-cyan-20 text-xs hover:text-white p-1 m-1 hover:cursor-pointer bg-blue-500 border rounded-lg"
                        onClick={togglePasswordVisibility}
                      >
                        {isPasswordVisible ? "Hide" : " Show"}
                      </span>
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="confirmPassword"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Confirm Password
                    </label>
                    <div className="flex">
                      <Field
                        type={isPasswordVisible ? "text" : "password"}
                        name="confirmPassword"
                        id="confirmPassword"
                        onBlur={(e) => {
                          if (e.target.value !== values.password) {
                            toast.error("Passwords do not match");
                          }
                        }}
                        placeholder="Confirm Password"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500"
                      />
                      <span
                        className="text-cyan-20 text-xs hover:text-white p-1 m-1 hover:cursor-pointer bg-blue-500 border rounded-lg"
                        onClick={togglePasswordVisibility}
                      >
                        {isPasswordVisible ? "Hide" : " Show"}
                      </span>
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="securityAnswer"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Security Question
                    </label>
                    <Field
                      type="text"
                      name="securityAnswer"
                      id="securityAnswer"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Whats your Girlfriend's pet name?"
                    />
                  </div>
                  <div className="inline-flex items-end">
                    <button
                      type="submit"
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </Form>
      )}
    </Formik>
  );
};
export default ForgotPassword;
