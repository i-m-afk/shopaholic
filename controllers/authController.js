import { comparePassword, hashPassword } from "../helpers/authHelper.js"
import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js"
import JWT from "jsonwebtoken"

export const updateProfileController = async (req, res) => {
    try {
        const { name, email, password, phone, } = req.body;
        if (!(name && email && password && phone)) {

            return res.send({ error: "All Fields is Required" })
        }
        const user = await userModel.findById(req.user._id);
        //password
        if (password && password.length < 6) {
            return res.json({ error: "Passsword is required and 6 character long" });
        }
        const hashedPassword = password ? await hashPassword(password) : undefined;
        const updatedUser = await userModel.findByIdAndUpdate(
            req.user._id,
            {
                name: name || user.name,
                password: hashedPassword || user.password,
                phone: phone || user.phone,
            },
            { new: true }
        );
        res.status(200).send({
            success: true,
            message: "Profile Updated SUccessfully",
            updatedUser,
        });
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: "Error WHile Update profile",
            error,
        });
    }
};
export const registerController = async (req, res) => {
    try {
        const { name, email, password, address, phone, state, country, zip, securityAnswer } = req.body
        if (!(name && email && password && address && phone && state && country && zip && securityAnswer)) {

            return res.send({ error: "All Fields is Required" })
        }
        //existing user check
        const existingUser = await userModel.findOne({ email })
        if (existingUser)
            return res.status(400).send({ success: false, message: 'Already Registered Please log in' })
        //register user
        const hashedPassword = await hashPassword(password)
        //save
        const user = await new userModel({ name, email, address, phone, state, country, zip, securityAnswer, password: hashedPassword }).save()
        res.status(200).send({
            success: true,
            message: "User Register Successfully",
            user
        })
    }
    catch (error) {
        res.status(500).send({
            success: false,
            message: 'Error in Registration'
        })
    }
}

export const loginController = async (req, res) => {
    const { email, password, } = req.body
    console.log(email, password);
    try {
        const user = await userModel.findOne({ email });
        console.log(user);
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "Email not registered"
            })
        }
        const match = await comparePassword(password, user.password)
        console.log(match)
        if (!match) {
            return res.status(404).send({
                success: false,
                message: "Wrong password"
            })
        }

        //token
        const token = JWT.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' })
        return res.status(200).send({
            success: true,
            message: 'login successfully',
            user: {
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
                role: user.role,
            },
            token
        });

    }
    catch (error) {
        res.status(500).send({
            success: false,
            message: 'LOGIN FAILED ',
            error
        })
    }

}
export const forgotPasswordController = async (req, res) => {
    try {
        const {
            email,
            confirmPassword,
            securityAnswer,
        } = req.body;
        if (!(email && confirmPassword && securityAnswer)) {
            return res.send({ error: "All Fields is Required" })
        }
        const existingUser = await userModel.findOne({ email });
        if (!existingUser) {
            return res.send({
                success: false,
                message: 'User not Found'
            })
        }
        if (existingUser.securityAnswer !== securityAnswer) {
            return res.send({
                success: false,
                message: 'Kuch toh Galat hai'
            })
        }
        const hashedPassword = await hashPassword(confirmPassword)
        const updatedUser = await userModel.findByIdAndUpdate(existingUser._id, {
            ...existingUser, password: hashedPassword,
        })
        return res.send({
            success: true,
            message: "Password Updated successfully",
            updatedUser
        })
    }
    catch (err) {
        res.status(500).send({
            success: false,
            message: 'Error in Password Changing'
        })
    }
}
export const testController = async (req, res) => {
    res.status(200).send({ message: "this is a protected Route user can only access when they have JWT token or signed in" })
}

export const getOrdersController = async (req, res) => {
    try {
        const orders = await orderModel
            .find({ buyer: req.user._id })
            .populate("products", "-photo")
            .populate("buyer", "name");
        res.json(orders);
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error WHile Geting Orders",
            error,
        });
    }
};
//orders
export const getAllOrdersController = async (req, res) => {
    try {
        const orders = await orderModel
            .find({})
            .populate("products", "-photo")
            .populate("buyer", "name")
            .sort({ createdAt: "-1" });
        res.json(orders);
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error WHile Geting Orders",
            error,
        });
    }
};

//order status
export const orderStatusController = async (req, res) => {
    try {
        const idStatMap = req.body.idStatMap;
        // Create an array to store the bulk write operations
        const bulkOps = [];
        // Iterate over the idStatMap and add update operations to the bulkOps array
        for (const orderId in idStatMap) {
            const status = idStatMap[orderId];
            bulkOps.push({
                updateOne: {
                    filter: { _id: orderId }, // Assuming '_id' is the MongoDB document ID field
                    update: { $set: { status: status } },
                },
            });
        }
        console.log({ idStatMap, bulkOps })
        // Perform the bulk write operation
        const result = await orderModel.bulkWrite(bulkOps);
        return res.status(200).send({ success: true, message: "Order Id Updated Successfully" })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error While Updating Orders",
            error,
        });
    }

};
