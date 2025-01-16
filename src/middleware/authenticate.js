const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const { findUserByName, addUser } = require('../models/model.user');
require('dotenv').config()
const signUp =  async (req, res) => {
    const result = validationResult(req);
    if (result.isEmpty()) {
        const { username, password } = req.body;
        const existingUser = await findUserByName(username);
        if (existingUser) {
            return res.status(400).json({ error: "User already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await addUser(username, hashedPassword);
        res.status(201).json({ message: "User registered successfully", userId: newUser.id });
    }
    else {
        res.send("Invalid username or password")
    }

}
const signIn =  async (req, res) => {
    const result = validationResult(req);
    if (result.isEmpty()) {
        const { username, password } = req.body;
        const user = await findUserByName(username);
        if (!user){
            return res.status(400).json({ error: "no user exists" });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
          return res.status(401).json({ error: "Invalid credentials" });
        }
      
        const token = jwt.sign({ userId: user.id, username: user.username },process.env.JWT_SECRET);
        res.json({ token });
    }
    else {
        res.send("Invalid username or password")
    }

}
module.exports = {signIn,signUp};