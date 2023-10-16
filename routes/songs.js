
const express = require("express");
const router = express.Router();
const Song = require("../models/song");
const jwt = require("jsonwebtoken");
const authJWT = require("../middleware/authJWT")

router.post("/", async (req, res) => {
    console.log(req.body);
    console.log("user 111", req.body.user);
    let newSong = await new Song({ ...req.body }).save();
    res.send(newSong);
});

router.get("/", async (req, res) => {
    let songsList = await Song.find({});
    res.send(songsList);
});

router.delete("/:title", authJWT, async (req, res) => {
    let song = await Song.findOne({ title: req.params.title });
    if (!song) return res.status(400);
    if (req.user.username === song.user) {
        deletedSong = await Song.deleteOne({ title: req.params.title });
        return res.send({ message: "OK", deletedSong });
    }
    return res.status(401);
});
module.exports = router;
