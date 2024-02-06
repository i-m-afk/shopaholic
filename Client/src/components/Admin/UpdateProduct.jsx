import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import { useCategory } from "../../context/categoriesContext";
import { useProduct } from "../../context/ProductContext";

const UpdateProduct = () => {
  const [categories] = useCategory();
  const [products, setProducts] = useProduct();
  const params = useParams();
  const [photo, setPhoto] = useState(null);
  const [data, setData] = useState({});
  const navigate = useNavigate();
  const getProductDetail = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/get-product/${params.slug}`
      );
      const pic = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/product-photo/${res.data.product._id}`,
        { responseType: "blob" } // Set responseType to 'blob' to receive binary data as a Blob object
      );
      setData(res.data.product);
      setPhoto(pic.data);
    } catch (error) {
      toast.error(error);
    }
  };
  useEffect(() => {
    getProductDetail();
  }, []);

  const defaultValue = {
    name: data.name || "",
    price: data.price || "",
    description: data.description || "",
    quantity: data.quantity || "",
    shipping: data.shipping || "",
    category: data.category?._id || "",
  };
  const handlePhotoSelect = (e) => {
    const selectedFile = e.target.files[0];
    setPhoto(selectedFile);
  };
  const handleOnSubmit = async (values) => {
    try {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("price", values.price);
      formData.append("description", values.description);
      formData.append("quantity", values.quantity);
      formData.append("shipping", values.shipping);
      formData.append("category", values.category);
      formData.append("photo", photo);
      const res = await axios.put(
        `${process.env.REACT_APP_API}/api/v1/product/update-product/${data._id}`,
        formData
      );
      let index = products.findIndex((i) => i._id === data._id);
      products.splice(index, 1, { ...data, ...values, photo });
      setProducts([...products]);
      toast.success("Product updated Successfully");
      navigate("/admin-dashboard/products");
    } catch (error) {
      toast.error(error);
    }
  };
  return (
    <Formik
      enableReinitialize={true}
      initialValues={defaultValue}
      onSubmit={handleOnSubmit}
    >
      {({ values, setFieldValue, handleSubmit }) => (
        <div className="mx-[220px] flex justify-center items-center bg-black w-6/12 rounded-[100px]">
          <Form className="m-0" onSubmit={handleSubmit}>
            <div className="flex flex-col justify-center items-center p-2 my-2">
              <label className="my-5 text-white font-medium">
                Product Name
              </label>
              <Field
                type="text"
                name="name"
                id="name"
                placeholder="name"
                className="bg-white rounded-2xl border-none w-full text-lg text-black mr-3 py-1 px-2 leading-9 focus:outline-none"
              />
              <label className="my-5 text-white font-medium block mt-4">
                Upload Photo
              </label>
              <Field
                type="file"
                name="photo"
                id="photo"
                accept="image/*"
                onChange={handlePhotoSelect} // Add this line
                className="bg-white rounded-2xl border-none w-full text-lg text-black mr-3 py-1 px-2 leading-9 focus:outline-none"
              />
              <div className="m-4">
                {photo && (
                  <div className="text-white text-center">
                    <img
                      src={URL.createObjectURL(photo)}
                      alt="Selected Photo"
                      className="max-w-[200px] mt-2 rounded-3xl"
                    />
                  </div>
                )}
              </div>
              <label className="my-5 text-white font-medium block mt-4">
                Product Price
              </label>
              <Field
                type="number"
                name="price"
                id="price"
                className=" bg-white rounded-2xl border-none w-full  text-lg  text-black mr-3 py-1 px-2 leading-9 focus:outline-none"
                placeholder="price"
              />
              <label className="  my-5 text-white font-medium block mt-4">
                Product Description
              </label>
              <Field
                component="textarea"
                id="description"
                name="description"
                className=" bg-white rounded-2xl border-none w-full  text-lg  text-black mr-3 py-1 px-2 leading-9 focus:outline-none"
                placeholder="description"
              />
              <label className="  my-5 text-white font-medium block mt-4">
                Product Quantity
              </label>
              <Field
                type="number"
                name="quantity"
                id="quantity"
                className=" bg-white rounded-2xl border-none w-full  text-lg  text-black mr-3 py-1 px-2 leading-9 focus:outline-none"
                placeholder="quantity"
              />
              <label className="  my-5 text-white font-medium block mt-4">
                shipping
              </label>
              <Field
                type="text"
                id="shipping"
                className=" bg-white rounded-2xl border-none w-full  text-lg  text-black mr-3 py-1 px-2 leading-9 focus:outline-none"
                placeholder="shipping"
                name="shipping"
              />
              <label className="  my-5 text-white font-medium block mt-4">
                Category
              </label>{" "}
              <Field
                as="select"
                name="category"
                onChange={(e) => setFieldValue("category", e.target.value)}
                id="category"
                className="bg-white rounded-2xl border-none w-full text-lg text-black mr-3 py-1 px-2 leading-9 focus:outline-none"
              >
                {categories?.map((item) => (
                  <option
                    value={item?._id}
                    key={item?._id}
                    className="bg-white rounded-2xl border-none w-full text-lg text-black mr-3 py-1 px-2 leading-9 focus:outline-none"
                  >
                    {item.name}
                  </option>
                ))}
              </Field>
              <button
                className="m-10 p-3 bg-cyan-500 mx-[100px] w-5/12 text-lg text-black font-bold rounded-[40px]"
                type="submit"
              >
                Submit
              </button>
            </div>
          </Form>
        </div>
      )}
    </Formik>
  );
};

export default UpdateProduct;
