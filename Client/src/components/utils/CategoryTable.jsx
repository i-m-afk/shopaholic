import React from "react";
import { useCategory } from "../../context/categoriesContext";

const CategoryTable = ({ setSelected, setShowModal, setShowDeleteModal }) => {
  const [categories, setCategories] = useCategory();
  return (
    <table className="w-full text-sm text-left text-white dark:text-gray-400">
      <thead className="text-3xl text-black uppercase text-center bg-gray-200">
        <tr>
          <th scope="col" className="px-6 py-3">
            Names
          </th>
          <th scope="col" className="px-6 py-3">
            Actions
          </th>
        </tr>
      </thead>
      <tbody className="text-lg">
        {categories?.map((item) => (
          <tr
            key={item._id}
            className="bg-white border-b dark:bg-gray-900 dark:border-gray-700"
          >
            <td
              scope="row"
              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center" // Center the text
            >
              {item.name}
            </td>
            <td
              scope="row"
              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center" // Center the text
            >
              <button
                className="m-3 p-3 bg-cyan-500 rounded-lg"
                onClick={() => {
                  setShowModal(true), setSelected(item);
                }}
              >
                Edit
              </button>
              <button
                className="m-3 p-3 bg-red-500 rounded-lg"
                onClick={() => {
                  setShowDeleteModal(true), setSelected(item);
                }}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CategoryTable;
