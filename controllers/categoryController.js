import categoryModel from "../models/categoryModel.js";
import slugify from "slugify";
export const createCategoryController = async (req, res) => {
    try {
        const { name } = req.body;
        if (!name)
            return res.status(401).send({
                message: "Name is Required"
            })
        const existingCategory = await categoryModel.findOne({ name });
        if (existingCategory) {
            return res.status(200).send({
                success: true,
                message: "Category with same name already existed"
            })
        }

        const category = await new categoryModel({ name, slug: slugify(name) }).save()
        return res.status(200).send({
            success: true,
            message: "Category has been created",
            category
        })
    }
    catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            error,
            message: 'Error in creating Category'
        })
    }
}


export const updateCategoryController = async (req, res) => {
    try {
        const { name } = req.body;
        const { id } = req.params; //this means it will come from URL
        const category = await categoryModel.findByIdAndUpdate(id, { name, slug: slugify(name) }, { new: true })
        return res.status(200).send({
            success: true,
            message: "Category has been Updated Successfully",
            category
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            error,
            message: 'Error in updating Category'
        })

    }
}


//get all category

export const category = async (req, res) => {
    try {
        const category = await categoryModel.find({})
        return res.status(200).send({
            success: true,
            message: "All Category List",
            category
        })

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            error,
            message: 'Error in getting category'
        })
    }
}

//get single category based upon slug
export const singleCategory = async (req, res) => {
    const { slug } = req.params
    try {
        const category = await categoryModel.findOne({ slug: slug })

        return res.status(200).send({
            success: true,
            message: `${slug} Category List`,
            category
        })

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            error,
            message: 'Error in updating Category'
        })
    }
}

//delete category
export const deleteCategoryController = async (req, res) => {
    try {
        const { id } = req.params
        await categoryModel.findByIdAndDelete(id);
        return res.status(200).send({
            success: true,
            message: 'Deleted Successfully'
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            error,
            message: 'Error in deleting Category'
        })
    }
}
