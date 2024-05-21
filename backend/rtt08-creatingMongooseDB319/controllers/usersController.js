const User = require('../models/user')

const bcrypt = require('bcryptjs')
// Encrypt Password? ---> use bcrypt
const jwt = require('jsonwebtoken')
// Sign-up 

const signup = async(req, res) => {
// 1. Get Email and Password - [req.body]
    const {email, password } = req.body;

    //** Hash Password {use bcryptjs} **/

// 2. Create User
   const newUser = await User.create({
        email, 
        password,
    });
    console.log('User Created', newUser)
// Send Response
    res.sendStatus(200)
}

// Login
const login = () => {
    
}

// Logout
const logout = () => {

}


module.exports = {
    signup,
    login,
    logout
}