import User from "./models/User.js";
import  bycrypt, { hash } from "bcrypt";
import connectToDataBase from "./db/db.js";

const userRegister = async () => {
    connectToDataBase()
    try{
        const hashPassword =await bycrypt.hash("admin",10)
        const newUser = new User({
            name: "admin",
            email:"admin@gmail.com",
            password: hashPassword,
            role: "admin"
        })
        await newUser.save()
    }catch(error) {
        console.log(error)
    }
}

userRegister();