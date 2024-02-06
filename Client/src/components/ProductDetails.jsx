import React, { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useProduct } from "../context/ProductContext";
import { Card } from "antd";

const ProductDetails = () => {
  const params = useParams();
  const slug = params?.slug;
  const [products, setProducts] = useProduct();
  const navigate = useNavigate();
  const selectedProduct = products?.find((i) => i?.slug === slug);
  const relatedProduct = products?.filter(
    (i) =>
      i?.category?._id === selectedProduct?.category?._id &&
      i?._id !== selectedProduct?._id
  );
  //initialdetails
  //   useEffect(() => {
  //     if (params??.slug) getProduct();
  //   }, [params??.slug]);
  //   //getProduct
  //   const getProduct = async () => {
  //     try {
  //       const { data } = await axios?.get(
  //         `/api/v1/product/get-product/${params?.slug}`
  //       );
  //       setProduct(data??.product);
  //       getSimilarProduct(data??.product?._id, data??.product?.category?._id);
  //     } catch (error) {
  //       console?.log(error);
  //     }
  //   };
  //   //get similar product
  //   const getSimilarProduct = async (pid, cid) => {
  //     try {
  //       const { data } = await axios?.get(
  //         `/api/v1/product/related-product/${pid}/${cid}`
  //       );
  //       setRelatedProducts(data??.products);
  //     } catch (error) {
  //       console?.log(error);
  //     }
  //   };
  return (
    <div>
      <div
        key={selectedProduct?._id}
        className="selected-product m-[100px] flex flex-wrap border-solid border-2 p-2"
      >
        <h1> Product Details </h1>
        <div className="">
          <img
            className="w-[250px] h-[300px] rounded-3xl "
            src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${selectedProduct?._id}`}
          />
        </div>

        <div className="flex flex-col justify-center border-soli ml-[100px]">
          <h2>Name: {selectedProduct?.name}</h2>
          <h3>Price: {selectedProduct?.price}</h3>
          <h3>Description: {selectedProduct?.description}</h3>
          <h3>Quantity: {selectedProduct?.quantity}</h3>
        </div>
      </div>

      <div className="related-product m-[100px]  flex flex-wrap border-solid border-2 p-2 ">
        <h1>Related Products</h1>
        {relatedProduct?.map((item) => (
          <Link to={`/product-details/${item.slug}`}>
            <Card className=" rounded-3xl shadow-2xl m-10 bg-grey-100 hover:bg-stone-500">
              <img
                className="w-[100px] h-[100px] rounded-3xl"
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
};
export default ProductDetails;
