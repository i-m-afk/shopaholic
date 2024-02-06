import React, { Fragment, useState } from "react";
import { useForm } from "react-hook-form";
import { useCategory } from "../../context/categoriesContext";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useProduct } from "../../context/ProductContext";

const CreateProduct = () => {
  const [categories] = useCategory();
  const [product, setProduct] = useProduct();
  const [selectedPhoto, setSelectedPhoto] = useState(null); // Corrected state variable name
  const navigate = useNavigate();
  const handleFileChange = (e) => {
    setSelectedPhoto(e.target.files[0]); // Corrected state variable name
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("price", data.price);
      formData.append("description", data.description);
      formData.append("quantity", data.quantity);
      formData.append("shipping", data.shipping);
      formData.append("category", data.category);
      formData.append("photo", selectedPhoto);
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/product/create-product`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setProduct([...product, data]);
      toast.success("Product Created Successfully");
      navigate("/admin-dashboard/products");
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <div className="mx-[220px] flex justify-center items-center bg-black w-6/12 rounded-[100px]">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col justify-center items-center p-2 my-2">
          <label className="my-5 text-white font-medium">Product Name</label>
          <input
            type="text"
            placeholder="name"
            className="bg-white rounded-2xl border-none w-full text-lg text-black mr-3 py-1 px-2 leading-9 focus:outline-none"
            {...register("name", { required: true, maxLength: 80 })}
          />
          <label className="my-5 text-white font-medium block mt-4">
            Upload Photo
          </label>
          <input
            type="file"
            name="photo"
            accept="image/*"
            className="bg-white rounded-2xl border-none w-full text-lg text-black mr-3 py-1 px-2 leading-9 focus:outline-none"
            {...register("photo")}
            onChange={handleFileChange} // Corrected onChange attribute
          />
          <div className="m-4">
            {selectedPhoto && (
              <div className="text-white text-center">
                <img
                  src={URL.createObjectURL(selectedPhoto)}
                  alt="product-image"
                  width="300" // Adjust the width as needed
                  height="300" // Adjust the height as needed
                />
              </div>
            )}
          </div>
          <label className="my-5 text-white font-medium block mt-4">
            Product Price
          </label>
          <input
            type="number"
            className=" bg-white rounded-2xl border-none w-full  text-lg  text-black mr-3 py-1 px-2 leading-9 focus:outline-none"
            placeholder="price"
            {...register("price", { required: true, maxLength: 100 })}
          />
          <label className="  my-5 text-white font-medium block mt-4">
            Product Description
          </label>
          <textarea
            type="text"
            className=" bg-white rounded-2xl border-none w-full  text-lg  text-black mr-3 py-1 px-2 leading-9 focus:outline-none"
            placeholder="description"
            {...register("description", {
              required: true,
            })}
          />
          <label className="  my-5 text-white font-medium block mt-4">
            Product Quantity
          </label>
          <input
            type="number"
            className=" bg-white rounded-2xl border-none w-full  text-lg  text-black mr-3 py-1 px-2 leading-9 focus:outline-none"
            placeholder="quantity"
            {...register("quantity", {
              required: true,
            })}
          />
          <label className="  my-5 text-white font-medium block mt-4">
            shipping
          </label>
          <input
            type="text"
            className=" bg-white rounded-2xl border-none w-full  text-lg  text-black mr-3 py-1 px-2 leading-9 focus:outline-none"
            placeholder="shipping"
            {...register("shipping", {
              required: true,
            })}
          />
          <label className="  my-5 text-white font-medium block mt-4">
            Category
          </label>{" "}
          <select
            className="bg-white rounded-2xl border-none w-full text-lg text-black mr-3 py-1 px-2 leading-9 focus:outline-none"
            {...register("category", { required: true })}
          >
            {categories?.map((item) => (
              <option
                className="bg-white rounded-2xl border-none w-full text-lg text-black mr-3 py-1 px-2 leading-9 focus:outline-none"
                key={item._id}
                value={item._id}
              >
                {item.name}
              </option>
            ))}
          </select>
          <button
            className="m-10 p-3 bg-cyan-500 mx-[100px] w-5/12 text-lg text-black font-bold rounded-[40px]"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateProduct;
