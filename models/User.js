import mongoose from 'mongoose';
const userSchema = new  mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    role: {type: String, enm:["admin","employee"], required: true},
    profileImage: {type: String},
    employeeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee' }, 
    createAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now},
})

const User =mongoose.model("User",userSchema)
export default User;