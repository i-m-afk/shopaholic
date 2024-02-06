import React from "react";
import { Formik, Form, Field } from "formik";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth";

const Profile = () => {
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();
  const { name, email, phone, address, password, country, state, zip } =
    auth.user;
  const initialValues = {
    name,
    email,
    phone,
    password,
  };
  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize={true}
      onSubmit={async (values) => {
        try {
          const response = await axios.put(
            `${process.env.REACT_APP_API}/api/v1/auth/profile`,
            values
          );
          setAuth({
            ...auth,
            user: response.data.updatedUser,
          });

          toast.success(response.data.message);
          localStorage.setItem("auth", JSON.stringify(response.data));
          navigate(location.state || "/");
          toast.success(response.data.message);
        } catch (error) {
          toast.error(error.response.data.message);
        }
      }}
    >
      {({ handleSubmit }) => (
        <Form className="m-0" onSubmit={handleSubmit}>
          {
            <div className=" flex  items-center p-4 dark:bg-gray-900 ">
              <div className="w-4/12 mx-auto rounded-3xl dark:bg-gray-800 dark:border-gray-700">
                <div className=" text-gray-900 rounded shadow-xl px-4 md:p-12">
                  <div className="md:col-span-5 ">
                    <label
                      htmlFor="name"
                      className="block mb-2 text-sm font-medium  text-gray-900 dark:text-white"
                    >
                      Full Name
                    </label>
                    <Field
                      type="text"
                      name="name"
                      id="name"
                      className="  bg-gray-50 border px-4 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                    />
                  </div>
                  <div className="md:col-span-5 ">
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Email Address
                    </label>

                    <Field
                      type="email"
                      name="email"
                      disabled={true}
                      id="email"
                      className="  bg-gray-50 border px-4 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                      placeholder="email@domain.com"
                    />
                  </div>
                  <div className="md:col-span-3">
                    <label
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      htmlFor="Phone Number"
                    >
                      Phone Number
                    </label>
                    <Field
                      type="text"
                      name="phone"
                      id="phone"
                      className="  bg-gray-50 border px-4 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                      placeholder="+912xxxxxx"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      htmlFor="Password"
                    >
                      Password
                    </label>
                    <Field
                      type="text"
                      name="password"
                      id="password"
                      className="  bg-gray-50 border px-4 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                      placeholder="123****"
                    />
                  </div>

                  <button
                    type="submit"
                    className="bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                    update
                  </button>
                </div>
              </div>
            </div>
          }
        </Form>
      )}
    </Formik>
  );
};
export default Profile;
