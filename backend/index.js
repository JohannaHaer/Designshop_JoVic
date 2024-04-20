import {v2 as cloudinary} from 'cloudinary'
import 'dotenv/config'
import express from 'express'
import mongoose from 'mongoose'
import productRouter from './products/product.controller.js'
import userRouter from './users/user.controller.js'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'

await mongoose.connect(process.env.MONGODB_URI)

cloudinary.config({ 
    cloud_name: 'dp7ojaxv4', 
    api_key: '123687263278783', 
    api_secret: process.env.CLOUDINARY_SECRET
})

const PORT = 3000
const app = express()

app.use(cors({origin: process.env.CORS_ACCESS, credentials: true}))
app.use(bodyParser.json())
app.use(cookieParser())
app.use('/products', productRouter)
app.use('/user', userRouter)

app.listen(PORT, () => {
    console.log(`listening on http://localhost:${PORT}`)
})