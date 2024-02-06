import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        slug: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        category: {
            type: mongoose.ObjectId,   //Product of which ever category it belongs to it will be referenced here
            ref: "category", //this is the first parameters passed in category model export
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
        },
        photo: {
            data: Buffer,
            contentType: String,
        },
        shipping: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }  //This will add created by in document
);

export default mongoose.model("Products", productSchema);