import jwt from 'jsonwebtoken'
import 'dotenv/config'
export const checkAuth = async (req, res, next) => {
    try {
        const token = req.cookie.token
        const result = jwt.verify(token, process.env.JWT_SECRET)
        req.user = result
        next()
    } catch (error) {
        console.error(error)
        res.sendStatus(401).send('Authentification needed')
    }
}