import React, { useState } from "react";
import { useCategory } from "../context/categoriesContext";
import { Button, Card } from "antd";
import { useProduct } from "../context/ProductContext";
import { Link } from "react-router-dom";

function Category() {
  const [categories] = useCategory();
  const [products] = useProduct();
  const [showProducts, setShowProduct] = useState([]);
  const handleClick = (id) => {
    const showProducts = products?.filter((i) => i?.category?._id === id);
    setShowProduct([...showProducts]);
  };
  return (
    <div className="flex flex-wrap">
      <div className="w-3/12">
        <h1>Select Any Category:-</h1>
        {categories?.length > 0 &&
          categories?.map((i) => (
            <button
              key={i?._id}
              className="flex flex-col bg-transparent w-[200px] m-2 hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
              onClick={() => handleClick(i?._id)}
            >
              {i?.name}
            </button>
          ))}
      </div>
      <div className="w-9/12 flex flex-wrap">
        {showProducts?.length > 0 &&
          showProducts?.map((item) => (
            <Link to={`/product-details/${item?.slug}`}>
              <Card className=" flex justify-center w-[300px] h-[350px] rounded-3xl shadow-sm m-10 bg-grey-100 hover:shadow-2xl">
                <img
                  className="w-[200px] h-[200px] rounded-3xl "
                  src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${item?._id}`}
                />
                <p>{item?.name}</p>
                <p>{item?.price}</p>
              </Card>
            </Link>
          ))}
      </div>
    </div>
  );
}

export default Category;
