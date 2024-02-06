import React, { useEffect, useState } from "react";
import axios from "axios";
import Create from "./Create";
import { toast } from "react-toastify";
import CategoryModal from "../utils/CategoryModal";
import CategoryTable from "../utils/CategoryTable";
import DeleteConfirmation from "./DeleteConfirmation";
import { useCategory } from "../../context/categoriesContext";

const CreateCategory = () => {
  const [categories, setCategories] = useCategory();
  const [selected, setSelected] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleEdit = async (name) => {
    try {
      const res = await axios.put(
        `${process.env.REACT_APP_API}/api/v1/category/update-category/${selected?._id}`,
        { name }
      );
      const updatedArray = categories.map((item) => {
        if (item._id === selected._id) {
          return { ...item, name };
        }
        return item;
      });
      setCategories(updatedArray);
      setSelected(null);
      toast.success("Updated SuccessFully");
    } catch (error) {
      toast.error(error);
    }
  };
  const handleDelete = async () => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_API}/api/v1/category/delete-category/${selected?._id}`
      );
      const filteredArray = categories.filter(
        (item) => item._id !== selected._id
      );
      setCategories(filteredArray);
      setSelected(null);
      toast.success("Deleted SuccessFully");
      setShowDeleteModal(false);
    } catch (error) {
      toast.error(error);
      setShowDeleteModal(false);
    }
  };
  return (
    <div className="flex flex-col justify-centre p-10 mt-2 bg-gray-300 rounded-3xl shadow-2xl ">
      <h1 className=" text-3xl  text-center font-medium">Manage Categories</h1>

      <Create setSelected={setSelected} />

      <CategoryTable
        setSelected={setSelected}
        setShowModal={setShowModal}
        setShowDeleteModal={setShowDeleteModal}
      />

      <CategoryModal
        showModal={showModal}
        handleEdit={handleEdit}
        setShowModal={setShowModal}
        setSelected={setSelected}
      />
      <DeleteConfirmation
        showDeleteModal={showDeleteModal}
        handleDelete={handleDelete}
        setShowDeleteModal={setShowDeleteModal}
        setSelected={setSelected}
      />
    </div>
  );
};

export default CreateCategory;
