import express from "express";
import {
    brainTreePaymentController,
    braintreeTokenController,
    createProductController,
    deleteProductController,
    getProductController,
    getSingleProductController,
    productCountController,
    productFiltersController,
    productListController,
    productPhotoController,
    searchProductController,
    updateProductController,
} from "../controllers/productController.js";

import formidable from "express-formidable";
import { checkIsAdmin, requireSignIn } from "../middleware/authMiddleware.js";

const router = express.Router();

//routes
router.post(
    "/create-product",
    requireSignIn,
    checkIsAdmin,
    formidable(),
    createProductController
);

router.put(
    "/update-product/:pid",
    requireSignIn,
    checkIsAdmin,
    formidable(),
    updateProductController
);

//get products
router.get("/get-product", getProductController);

//single product
router.get("/get-product/:slug", getSingleProductController);

//get photo
router.get("/product-photo/:pid", productPhotoController);

//delete product
router.delete("/delete-product/:pid", deleteProductController);
//filter product
router.post("/product-filters", productFiltersController);

router.get("/product-count", productCountController);

//product per page
router.get("/product-list/:page", productListController);

//search product
router.get("/search/:keyword", searchProductController);

//payment route
//token
router.get('/braintree/token', braintreeTokenController);

router.post("/braintree/payment", requireSignIn
    , brainTreePaymentController);

export default router;