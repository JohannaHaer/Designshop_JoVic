import mongoose, { Schema } from "mongoose"

const userSchema = new Schema ({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    passwordHash: {
        type: String,
        required: true
    },
    cart: {
        type: [
            {
            type:Schema.Types.ObjectId,
            ref: 'Products'
        },
    ],
    default: []
    },
})

export const User = mongoose.model('User', userSchema, 'users')