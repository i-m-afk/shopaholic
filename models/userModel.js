import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,

    },
    phone: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },

    country: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    zip: {
        type: String,
        required: true
    },
    billingSame: {
        type: Boolean,
        required: false
    },
    securityAnswer: {
        type: String,
        require: true
    },
    role: {
        type: String,
        default: 'user'
    }
}, { timesStamps: true })

export default mongoose.model('users', userSchema)