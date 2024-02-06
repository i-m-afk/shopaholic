import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const CategoriesContext = createContext();
const CategoriesProvider = ({ children }) => {
  const [categories, setCategories] = useState([{}]);
  const getAllCategories = async () => {
    const res = await axios.get(
      `${process.env.REACT_APP_API}/api/v1/category/get-category`
    );
    setCategories(res.data.category);
  };
  useEffect(() => {
    getAllCategories();
  }, []);

  return (
    <CategoriesContext.Provider value={[categories, setCategories]}>
      {children}
    </CategoriesContext.Provider>
  );
};

//custom hook for using this context anywhere in the app;

const useCategory = () => useContext(CategoriesContext);

export { useCategory, CategoriesProvider };
