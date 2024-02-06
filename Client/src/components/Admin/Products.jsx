import React, { useEffect, useState } from "react";
import { Card } from "antd";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useProduct } from "../../context/ProductContext";

const Products = ({ setSelected = () => {} }) => {
  const [products, setProducts] = useProduct();
  const location = useLocation();
  const { pathname } = location;
  return (
    <div className="flex flex-wrap justify-center m-6 ">
      {products?.length > 0 &&
        products?.map((item) => (
          <Link
            key={item._id}
            to={
              pathname !== `/admin-dashboard/delete-product`
                ? `/admin-dashboard/update-product/${item?.slug}`
                : ""
            }
          >
            <Card
              onClick={() => {
                setSelected(item._id);
              }}
              className=" rounded-3xl shadow-2xl m-10 bg-grey-100 hover:bg-stone-500"
            >
              <img
                className="w-[200px] h-[200px] rounded-3xl"
                src={
                  products.length > 0
                    ? `${process.env.REACT_APP_API}/api/v1/product/product-photo/${item?._id}`
                    : "null"
                }
              />
              <p>{item?.name}</p>
              <p>{item?.price}</p>
            </Card>
          </Link>
        ))}
    </div>
  );
};

export default Products;
