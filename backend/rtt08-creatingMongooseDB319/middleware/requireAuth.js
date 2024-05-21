const jwt = require('jsonwebtoken')
const User = require('../models/user')

const requireAuth = async( req, res, next) => {
    // 1. Read token off cookie
    const token = req.cookies.Authorization
    // 2. Decode Token --> jwt
    const decoded = jwt.verify(token, process.env.SECRET)
        
    // 2a. Check if the token is expired

    // 3. Find user [decoded sub]
    const user = await User.findById(decoded.sub)
    if(!user) return res.sendStatus(401)
    // 4. Attach user to request
    req.user = user
    next()
}

module.exports = requireAuth;