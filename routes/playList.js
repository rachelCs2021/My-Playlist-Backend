
const express = require("express")
const axios = require("axios")
const { models } = require("../models/index")
const authJWT = require("../middleware/authJWT")
const { modelNames } = require("mongoose")
const { PlayList } = models
const router = express.Router();

router.get("/", authJWT, async (req, res) => {
    console.log("add to playlist");
    const userId = req.user._id
    console.log(userId);
    const songs = await PlayList.find({ createdBy: userId })
    res.json(songs)
});

router.put("/", authJWT, async (req, res) => {
    console.log("playlistt");
    const userId = req.user._id
    const playlist = await playlist.find({ createdBy: userId })
    playlist.songs.push(req.song)
    const savedPlaylist = await playlist.save()
    console.log(savedPlaylist);
    res.json(savedPlaylist)
})

module.exports = router