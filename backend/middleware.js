require('dotenv').config();

const jwt = require("jsonwebtoken")
const JWT_SECRET = process.env.JWT_SECRET

function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer')) {
        return res.status(403).json({ message: "Missing authorization header" })
    }
    const token = authHeader.split(' ')[1]
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.userId = decoded.userId;
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Forbidden: Invalid token' })
    }
}

module.exports = { authMiddleware }
