import { Button, Modal } from "antd";

import React from "react";

const DeleteConfirmation = ({
  showDeleteModal = false,
  handleDelete = () => {},
  setShowDeleteModal = false,
  setSelected = () => {},
}) => {
  const handleCancel = () => {
    setShowDeleteModal(false);
    setSelected(null);
  };

  return (
    <Modal
      title="Edit Name"
      open={showDeleteModal}
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
          className="mr-2 border border-gray-300"
          onClick={handleDelete}
        >
          Confirm
        </Button>,
      ]}
    >
      Are you sure you want to delete this is irreversible ?
    </Modal>
  );
};

export default DeleteConfirmation;
