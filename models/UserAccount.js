import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
     username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    profilePic: {
        type: String,
      
    },
    coverPic: {
        type: String,
        required:true,
    },
    paynumber:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
})

const UserAccount = mongoose.models.UserAccount || mongoose.model("UserAccount", userSchema);
export default UserAccount;
