const {signIn,signUp} = require('../middleware/authenticate');
const { body } = require('express-validator');

const ValidateUser = [
    body("username").escape(),
    body("password").escape()
]
// sign up
exports.postSignUp = [ValidateUser,signUp];
//signin
exports.postSignIn =  [ValidateUser,signIn];
