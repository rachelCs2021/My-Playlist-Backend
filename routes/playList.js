
const express = require("express")
const axios = require("axios")
const { models } = require("../models/index")
const { authJWT } = require("../middleware/authJWT")
const { modelNames } = require("mongoose")
const { PlayList } = models
const router = express.Router();

router.get("/", authJWT, async (req, res) => {
    const userId = req.user._id
    const songs = await PlayList.find({ createdBy: userId })
    res.json(songs)

});

module.exports = router