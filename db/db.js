import mongoose from "mongoose";

const connectToDataBase = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL)
    } catch (error) {
        console.log(error)
    }
}

export default connectToDataBase