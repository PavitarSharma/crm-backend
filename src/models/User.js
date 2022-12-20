import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true
    },

    email: {
        type: String,
        required: true,
        trim: true
    },

    password: {
        type: String,
        required: true,
        trim: true
    },

    phone: {
        type: Number,
        maxlength: 13
    },

    address: {
        type: String,
    },

    company: {
        type: String,
    }
});

const User = mongoose.model("User", userSchema);


export default User;