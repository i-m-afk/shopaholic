import React from "react";
import { Formik, Form, Field } from "formik";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const initialValues = {
  name: "Hrithik Raj",
  email: "write2hrithik@gmail.com",
  phone: "917903305088",
  address: "Pashan",
  password: "12345",
  country: "India",
  state: "Maharashtra",
  zip: "411021",
  securityAnswer: "",
  billingSame: false,
};

const Register = () => {
  const navigate = useNavigate();
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={async (values) => {
        try {
          const response = await axios.post(
            `${process.env.REACT_APP_API}/api/v1/auth/register`,
            values
          );
          toast.success(response.data.message);
          setTimeout(() => {
            navigate("/login");
          }, 1000);
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
                  <div className="md:col-span-3">
                    <label
                      htmlFor="address"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Address / Street
                    </label>
                    <Field
                      type="text"
                      name="address"
                      id="address"
                      className="  bg-gray-50 border px-4 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                      placeholder="kurji, more"
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
                  <div className="md:col-span-3">
                    <label
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      htmlFor="securityAnswer"
                    >
                      Security Question
                    </label>
                    <Field
                      type="text"
                      name="securityAnswer"
                      id="securityAnswer"
                      className="  bg-gray-50 border px-4 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                      placeholder="Whats you girlfriend's pet name?"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      htmlFor="country"
                    >
                      Country / region
                    </label>
                    <div className="h-10 flex border-gray-300 rounded items-center mt-1">
                      <Field
                        name="country"
                        id="country"
                        placeholder="Country"
                        className="px-4  border-gray-300 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white w-full bg-transparent"
                      />
                    </div>
                  </div>
                  <div className="md:col-span-2">
                    <label
                      htmlFor="state"
                      className="block mb-2 text-sm font-medium  border-gray-300 dark:text-white"
                    >
                      State / province
                    </label>
                    <div className="h-10 bg-gray-50 flex border  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white w-full bg-transparent border-gray-200 rounded items-center mt-1">
                      <Field
                        name="state"
                        id="state"
                        placeholder="State"
                        className="px-4  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white  appearance-none outline-none  border-gray-300 text-gray-800 w-full bg-transparent"
                      />
                    </div>
                  </div>
                  <div className="md:col-span-1">
                    <label
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      htmlFor="zipcode"
                    >
                      Zipcode
                    </label>
                    <Field
                      type="text"
                      name="zip"
                      id="zip"
                      className="transition-all flex items-center   bg-gray-50 border px-4 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                      placeholder="800010"
                    />
                  </div>

                  <button
                    type="submit"
                    className="bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Register
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

export default Register;
