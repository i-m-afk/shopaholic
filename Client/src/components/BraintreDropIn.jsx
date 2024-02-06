import React, { useEffect, useState } from "react";
import "../../index.css";
import dropin from "braintree-web-drop-in";
import { useAuth } from "../context/auth";
import axios from "axios";
import { useCart } from "../context/cartContext";
import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
export default function BraintreeDropIn(props) {
  const { show, onPaymentCompleted } = props;
  const [auth] = useAuth();
  const [cartItem, setCartItem] = useCart();
  const [clientToken, setClientToken] = useState(
    "sandbox_s9gd7m2p_vp62s592633kc5p5"
  );
  const [braintreeInstance, setBraintreeInstance] = useState(undefined);
  const navigate = useNavigate();
  const handlePayment = async () => {
    try {
      const { nonce } = await braintreeInstance.requestPaymentMethod();

      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/product/braintree/payment`,
        {
          nonce,
          cartItem,
        }
      );
      localStorage.removeItem("cart");
      setCartItem([]);
      navigate("/user-dashboard/orders");
      //   toast.success("Order Placed Successfully");
    } catch (error) {}
  };
  const getToken = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/braintree/token`
      );
      setClientToken(data?.clientToken);
    } catch (error) {}
  };
  useEffect(() => {
    getToken();
  }, [auth?.token]);

  useEffect(() => {
    if (show) {
      const initializeBraintree = () =>
        dropin.create(
          {
            // insert your tokenization key or client token here
            authorization: clientToken,
            container: "#braintree-drop-in-div",
            paypal: {
              flow: "vault",
            },
          },
          function (error, instance) {
            if (error) console.error(error);
            else setBraintreeInstance(instance);
          }
        );

      if (braintreeInstance) {
        braintreeInstance.teardown().then(() => {
          initializeBraintree();
        });
      } else {
        initializeBraintree();
      }
    }
  }, [show]);

  return (
    <div style={{ display: `${show ? "block" : "none"}` }}>
      <div id={"braintree-drop-in-div"} />

      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        type="primary"
        disabled={!braintreeInstance || !clientToken || !auth?.user?.address}
        // onClick={() => {
        //   if (braintreeInstance) {
        //     braintreeInstance.requestPaymentMethod((error, payload) => {
        //       if (error) {
        //         console.error(error);
        //       } else {
        //         const paymentMethodNonce = payload.nonce;
        //         ;

        //         // TODO: use the paymentMethodNonce to
        //         //  call you server and complete the payment here

        //         // ...

        //         alert(`Payment completed with nonce=${paymentMethodNonce}`);

        //         onPaymentCompleted();
        //       }
        //     });
        //   }
        // }}
        onClick={handlePayment}
      >
        {"Pay"}
      </button>
    </div>
  );
}
