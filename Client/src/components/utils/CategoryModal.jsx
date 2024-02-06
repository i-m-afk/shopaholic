import React, { useState } from "react";
import { Button, Modal } from "antd";
import { useCategory } from "../../context/categoriesContext";

const CategoryModal = ({
  showModal = false,
  handleEdit,
  setShowModal,
  setSelected,
}) => {
  const [name, setName] = useState("");
  const [categories, setCategories] = useCategory();
  const handleOk = () => {
    handleEdit(name);
    setShowModal(false);
  };

  const handleCancel = () => {
    setShowModal(false);
    setSelected(null);
  };

  return (
    <Modal
      title="Edit Name"
      open={showModal}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={[
        <Button
          key="cancel"
          onClick={handleCancel}
          className="mr-2 border border-gray-300"
        >
          Cancel
        </Button>,
        <Button
          key="ok"
          className="flex-shrink-0 bg-cyan-500  text-white py-1 px-2 rounded"
          onClick={handleOk}
        >
          Save
        </Button>,
      ]}
    >
      <div className="flex items-center border-b border-teal-500 py-2">
        <input
          className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
          type="text"
          value={name}
          placeholder="Enter Category Name"
          aria-label="Enter Category Name"
          onChange={(e) => setName(e.target.value)}
        />
      </div>
    </Modal>
  );
};

export default CategoryModal;
