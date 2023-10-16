const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();
const User = require("../models/User");

router.post("/register", async (req, res) => {
    try {
        console.log(req.body);
        const userAlreadyExists = await User.findOne({
            userName: req.body.userName,
        });
        if (userAlreadyExists) {
            return res.status(401).send("user name already Exists");
        }
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const user = new User({
            userName: req.body.userName,
            email: req.body.email,
            password: hashedPassword
        });
        console.log(user);
        const savedUser = await user.save();
        console.log("New user saved successfully");
        console.log(user);
        savedUser.password = undefined;
        const accessToken = jwt.sign(JSON.stringify(savedUser), process.env.TOKEN_SECRET);
        res.json({ accessToken });
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: "internal server error" });
    }
});

router.post("/login", async (req, res) => {

    try {
        console.log(req.body);
        const user = await User.findOne({ userName: req.body.userName });
        if (!user) return res.status(400).json({ message: "Invalid credentials" });
        const match = await bcrypt.compare(req.body.password, user.password);
        console.log("match:", match);
  
        if (match) {
            const accessToken = jwt.sign(JSON.stringify(user), process.env.TOKEN_SECRET);
            console.log(accessToken);
            res.json({ accessToken });
        } else {
            console.log("error");
            res.status(400).json({ message: "Invalid credentials" });
        }
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: "internal server error" });
    }
});

router.get("/", async (req, res) => {
    let users = await User.find({});
    res.send(users);
});
module.exports = router;