import express from 'express'
import { Product } from './product.model.js'
import multer from 'multer'
import { uploadImage } from '../utils/uploadImage.js'

const router = express.Router()
const storage = multer.memoryStorage()
const mult = multer({storage: storage})

router.get('/', async (req, res) => {
    const product = await Product.find().lean()
    res.json(product)
})

router.post('/', mult.single('image'), async (req,res) => {
    try {
        const {productName, company, price, link, altText} = req.body
        const response = await uploadImage(req.file.buffer)
        const imageURL = response.secure_url
        const newProduct = new Product({productName, company, price, link, altText, imageURL});
        console.log('wanne know', req.body)
        const saveResult = await newProduct.save()
        
        // console.log('wanne know the response', response)
        res.status(201).json(saveResult);
    } catch (error) {
        console.error(error)
        res.sendStatus(500)
    }
})

export default router