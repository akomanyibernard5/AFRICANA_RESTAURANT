import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect("mongodb+srv://akomanyibernard5:iloveHelena15@cluster0.8ywoioc.mongodb.net/Food").then(() =>
        console.log(
            "DB Connected"
        ))
}

