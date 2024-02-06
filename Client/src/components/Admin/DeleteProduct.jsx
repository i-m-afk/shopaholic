import React, { useEffect, useState } from "react";
import Products from "./Products";
import DeleteConfirmation from "./DeleteConfirmation";
import { toast } from "react-toastify";
import axios from "axios";
import { useProduct } from "../../context/ProductContext.jsx";

const DeleteProduct = () => {
  const [selected, setSelected] = useState(null);
  const [products, setProducts] = useProduct();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const handleDelete = async () => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_API}/api/v1/product/delete-product/${selected}`
      );
      const updatedProducts = products.filter((i) => i._id !== selected);
      setProducts(updatedProducts);
      setShowDeleteModal(false);
      toast.success("Deleted Successfully");
    } catch (error) {
      toast.error(error);
    }
  };
  useEffect(() => {
    if (selected !== null) {
      setShowDeleteModal(true);
    }
  }, [selected]);
  return (
    <>
      <Products setSelected={setSelected} />
      <DeleteConfirmation
        handleDelete={handleDelete}
        showDeleteModal={showDeleteModal}
        setShowDeleteModal={setShowDeleteModal}
      />
    </>
  );
};

export default DeleteProduct;
