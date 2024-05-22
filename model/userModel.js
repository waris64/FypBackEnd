import mongoose from "mongoose";
import validator from "validator";
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        maxLength: [30, "Name should'nt exceed more than 30 characters"],
        minLength: [4, "Name Should be more than 4 character"],
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: [validator.isEmail, "Please Enter Valid Email"]
    },
    password: {
        type: String,
        required: true,
        minLength: [8, "Password should be more than 8 characters"],
        select: false
    }

}, { timestamps: true })


const User = mongoose.model('New', userSchema)

export default User