import mongoose from "mongoose";
import dotenv from 'dotenv'
import colors from 'colors'

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline.bold);
    } catch (error) {
        console.log(`mongoDB Error ${error}`.bgBlack.red.white)
    }
}

export default connectDB