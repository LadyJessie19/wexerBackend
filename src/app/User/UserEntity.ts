import mongoose from "mongoose"

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    nickname: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
        minLength: 6,
        select: false
    },
    patients:[{
        type: mongoose.SchemaTypes.ObjectId, 
        ref: 'Patient'
    }]
}, {timestamps: true})

const User = mongoose.model("User", UserSchema)

export default User