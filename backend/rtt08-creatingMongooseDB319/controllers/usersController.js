const User = require('../models/user')
const bcrypt = require('bcryptjs')
// Encrypt Password? ---> use bcrypt
const jwt = require('jsonwebtoken')

// -----------------------------{Sign-up }------------------
const signup = async(req, res) => {
// 1. Get Email and Password - [req.body]
    const {email, password } = req.body;

    //** Hash Password {use bcryptjs} **/
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
// 2. Create User
   const newUser = await User.create({
        email, 
        password: hashedPassword
    });
    console.log('User Created', newUser)
// Send Response
    res.sendStatus(200)
}

// -----------------------------{Login}------------------
const login = async(req, res) => {
    try {
        // 1. Get email and password -[req.body]
    const {email, password} = req.body
    // 2. Find User with requested email
        const user = await User.findOne({email})
        console.log(`User: ${user}`)
    // 2a. If there is no user
        if(!user) return res.sendStatus(401)
    // 3. Compare password with foundUser
        const passwordMatch = bcrypt.compareSync(password,user.password)
        console.log(passwordMatch)
        console.log("Password Verified")
        //3a. If the password doesn't match
        if(!passwordMatch) return res.sendStatus(401)
    // 4. Create JWT
        // Date.now is in milliseconds ---> convert by the following: Date.now() + 1000 * 60 * 60 * 24 * 30
        // exp is to set an expiration date for the token.  In this case it's 30 days
        const exp = Date.now() + 1000 * 60 * 60 * 24 * 30
        console.log(exp)
        const token = jwt.sign({sub: user._id, exp}, process.env.SECRET)
        console.log(token)

        // -------------Cookie
        res.cookie("Authorization", token, {
            // sets expiration 
            expires: new Date(exp),
            // allows only browser and server to read
            httpOnly: true,
            sameSite: "lax"
        })
        // 5. Send Response
        res.sendStatus(200)

    } catch (error) {
        console.log(error)
    }
}
const checkAuth = (req, res) => {
    console.log(req.user)
    res.sendStatus(200)
}

// -----------------------------{Logout}------------------
const logout = (req, res) => {
    res.clearCookie("Authorization")
    res.sendStatus(200)
}

module.exports = {
    signup,
    login,
    logout,
    checkAuth
}