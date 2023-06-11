import mongoose from "mongoose";
import validator from "validator";
import bcrypt from 'bcryptjs';
import Jwt from "jsonwebtoken";
//schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is Required']
    },
    lastName: {
        type: String
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        validate: validator.isEmail
    },
    password: {
        type: String,
        minlength: [8, 'Password must be at least 8 characters long'],
        required: [true, 'password is required']
    },
    location: {
        type: String,
        default: 'mumbai'
    }
}, { timestamps: true });

//middleware
userSchema.pre('save', async function () {
    if (!this.isModified) return;
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt);
})

//compare password
userSchema.methods.comparePassword = async function (userPassword) {
    const isMatch = await bcrypt.compare(userPassword, this.password)
    return isMatch;
}

//JSON WebToken
userSchema.methods.createJWT = function () {
    return Jwt.sign({ userId: this._id }, process.env.JWT_SECRETE, { expiresIn: '15d' })
}

export default mongoose.model('User', userSchema)