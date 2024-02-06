import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCategory } from "../context/categoriesContext";
import { useProduct } from "../context/ProductContext";
import { Card } from "antd";
import { Prices } from "./Prices";
import { toast } from "react-toastify";
import axios from "axios";
import Spinner from "./Spinner";
import { useCart } from "../context/cartContext";

const Home = () => {
  const [categories] = useCategory();
  const [products, setProducts] = useProduct();
  const [showProducts, setShowProducts] = useState(products);
  const [checked, setChecked] = useState([]);
  const [radioOption, setRadioOption] = useState([]);
  const [cartItem, setCartItem] = useCart();
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const handleFilter = (isChecked, id) => {
    let allCheckId = [...checked];
    if (isChecked) {
      allCheckId.push(id);
    } else {
      allCheckId = allCheckId.filter((id) => id !== id);
    }
    setChecked(allCheckId);
  };
  const handleAddToCart = (product) => {
    // localStorage.setItem(cartItem);
    setCartItem([...cartItem, product]);
    localStorage.setItem("cart", JSON.stringify([...cartItem, product]));
  };
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/product-list/${page}`
      );
      setLoading(false);
      setShowProducts([...showProducts, ...data?.products]);
    } catch (error) {}
  };
  const getTotal = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/product-count`
      );
      setLoading(false);
      setTotal(data?.total);
    } catch (error) {}
  };
  const fetchFilterData = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/product/product-filters`,
        { checked, radioOption }
      );
      setLoading(false);

      const dataId = data.products?.map((i) => i?._id);
      const updatedProducts = showProducts.filter((i) =>
        dataId.includes(i?._id)
      );
      setShowProducts([...updatedProducts]);
    } catch (error) {
      toast.error(error);
    }
  };
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/product-list/${page}`
      );
      setShowProducts(data?.products);
      setLoading(false);
    } catch (error) {}
  };

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);

  useEffect(() => {
    getTotal();
  }, []);

  useEffect(() => {
    if (checked?.length > 0 || radioOption?.length > 0) fetchFilterData();
    else getAllProducts();
  }, [checked, radioOption]);
  return (
    <div className="flex  m-2">
      <div className="w-3/12 p-3 m-4 border-l-gray-700y flex flex-col justify-start">
        <div className="m-4">
          <h1>Filter By Categories </h1>
          {categories?.map((i) => (
            <div
              key={i?._id}
              className="mx-10 mb-[0.125rem] block min-h-[1.5rem] pl-[1.5rem]"
            >
              <input
                className="relative float-left -ml-[1.5rem] mr-[6px] mt-[0.15rem] h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-neutral-300 outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] checked:border-primary checked:bg-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:-mt-px checked:after:ml-[0.25rem] checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid checked:after:border-black checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:-mt-px checked:focus:after:ml-[0.25rem] checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-l-0 checked:focus:after:border-t-0 checked:focus:after:border-solid checked:focus:after:border-black checked:focus:after:bg-transparent dark:border-neutral-600 dark:checked:border-primary dark:checked:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
                type="checkbox"
                onChange={(e) => {
                  handleFilter(e.target.checked, i?._id);
                }}
                value={i?._id}
                id={i?.name}
                checked={checked.includes(i?._id)}
              />
              <label
                className="inline-block pl-[0.15rem] hover:cursor-pointer"
                for="checkboxDefault"
              >
                {i.name}
              </label>
            </div>
          ))}
        </div>
        <h1>Filter By Price</h1>
        {Prices?.map((i) => (
          <div
            key={i._id}
            className="mx-10 mb-[0.125rem] block min-h-[1.5rem] pl-[1.5rem]"
          >
            <div class="mb-[0.125rem] block min-h-[1.5rem] pl-[1.5rem]">
              <input
                class="relative float-left -ml-[1.5rem] mr-1 mt-0.5 h-5 w-5 appearance-none rounded-full border-2 border-solid border-black before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-primary checked:after:bg-primary checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:border-primary checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:border-neutral-600 dark:checked:border-primary dark:checked:after:border-primary dark:checked:after:bg-blue-800 dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:border-primary dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
                type="radio"
                name="flexRadioDefault"
                id="radioDefault02"
                value={i?.array}
                checked={i.array === radioOption}
                onClick={(e) => {
                  setRadioOption(i?.array);
                }}
              />
              <label
                class="mt-px inline-block pl-[0.15rem] hover:cursor-pointer"
                for="radioDefault02"
              >
                {i.name}
              </label>
            </div>
          </div>
        ))}
        <button
          className="bg-blue-500 rounded-full p-2 m-2 "
          onClick={() => {
            setRadioOption([]); // Clear the radio options
            setChecked([]);
            getAllProducts();
          }}
        >
          Clear Filters{" "}
        </button>
      </div>
      <div>
        <div className="flex flex-wrap justify-center w-9/12 m-6 ">
          {showProducts?.map((item) => (
            <div className="flex flex-col justify-center w-[300px] h-[350px] rounded-3xl shadow-sm m-10 bg-grey-100 hover:shadow-2xl">
              <Link to={`/product-details/${item.slug}`}>
                <Card>
                  <img
                    className="w-[200px] h-[200px] rounded-3xl "
                    src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${item?._id}`}
                  />
                  <p>{item?.name}</p>
                  <p>{item?.price}</p>
                </Card>
              </Link>
              <button
                className=" bg-transparent flex  w-[100px] m-6 hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-1 border border-blue-500 hover:border-transparent rounded"
                onClick={() => handleAddToCart(item)}
              >
                Add To Cart
              </button>
            </div>
          ))}
        </div>
        <div>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={(e) => {
              e.preventDefault();
              setPage(page + 1);
            }}
          >
            {loading ? <Spinner /> : "Load More"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
