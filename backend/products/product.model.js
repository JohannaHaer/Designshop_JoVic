import mongoose, { Schema } from "mongoose"

const productSchema = new Schema ({
    productName: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    imageURL: {
        type: String,
        // required: true
    },
    altText: {
        type: String,
        required: true
    }
})

export const Product = mongoose.model('Product', productSchema, 'products') 
