import express from 'express'
import multer from 'multer'
import { User } from './user.model.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import 'dotenv/config'
import { checkAuth } from './user.middleware.js'

const router = express.Router()
const mult = multer()

router.post('/register', mult.none(), async (req,res) => {
    try {
        const {username, email, password} = req.body
        if(!username || !email || !password) {
            res.sendStatus(403)
            return
        }
        const salt = await bcrypt.genSalt()
        const hash = await bcrypt.hash(password, salt)
        const user = await User.create({username, email, passwordHash: hash})
        res.json(user)
    } catch (error) {
        console.error(error)
        res.sendStatus(500)
    }
})

router.post('/login', mult.none(), async (req, res) => {
    try {
        const {email, password} = req.body
        if(!email || !password) {
            res.sendStatus(403)
            return
        }
        const user = await User.findOne({email}).lean()
        if(user == null) {
            res.sendStatus(401).send('User not found')
            return
        }
        const compareResult = await bcrypt.compare(password, user.passwordHash)
        if(!compareResult) {
            res.json({status: 'failed'})
        } else {
            const username = user.username
            const token = jwt.sign({username}, process.env.JWT_SECRET)
            res.cookie('token', token, {httpOnly: true})
            res.json({status: 'ok', token: token})
        }
    } catch (error) {
        console.error(error)
        res.sendStatus(500)
    }
})

router.get('/logout', (req, res) => {
    res.clearCookie('token')
    res.end()
})

router.get('/:username', checkAuth, async (req, res) => {
    const username = req.params.username
    const user = await User.findOne({username}).lean()
    res.json(user)
})

router.post('/checkUserExist', mult.none(), async (req, res) => {
    const {username} = req.body
    try {
        const user = await User.findOne({username}).lean()
        if(user) {
            res.json({checkNameStatus: 'Username already exists'})
        } else {
            res.json({checkNameStatus: 'Ok'})
        }
    } catch (error) {
        console.error(error)
        res.sendStatus(500)
    }
})

router.post('/checkEmailExist', mult.none(), async (req, res) => {
    const {email} = req.body
    try {
        const user = await User.findOne({email}).lean()
        if(user) {
            res.json({checkEmailStatus: 'Email already exists'})
        } else {
            res.json({checkEmailStatus: 'Ok'})
        }
    } catch (error) {
        console.error(error)
        res.sendStatus(500)
    }
})

export default router