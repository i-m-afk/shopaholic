import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { useCategory } from "../../context/categoriesContext";

const Create = ({ setSelected }) => {
  const [categories, setCategories] = useCategory();
  const [name, setName] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/category/create-category`,
        { name }
      );

      categories.push(res.data.category);
      setCategories([...cat]);
      setSelected(res.data.category);
      toast.success("Created Successfully");
    } catch (error) {
      toast.error(error);
    }
  };
  return (
    <form className="w-full max-w-sm" onSubmit={handleSubmit}>
      <div className="flex my-[20px] items-center border-b border-teal-500 py-2">
        <input
          className=" bg-transparent border-none w-full text-xl text-black mr-3 py-1 px-2 leading-9 focus:outline-none"
          type="text"
          value={name}
          placeholder="Create a brand New Category"
          aria-label="Enter Category Name"
          onChange={(e) => setName(e.target.value)}
        />
        <button
          className="flex-shrink-0 bg-cyan-700  text-lg text-white py-1 px-2 rounded"
          type="submit"
        >
          Create
        </button>
      </div>
    </form>
  );
};

export default Create;
