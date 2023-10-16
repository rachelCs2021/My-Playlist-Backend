
const express = require("express");
const router = express.Router();
const Recommend = require("../models/Recommend");
const jwt = require("jsonwebtoken");
const authJWT = require("../middleware/authJWT")


router.get("/", async (req, res) => {
    let RecommendList = await Recommend.find({});
    res.send(RecommendList);
});

router.post("/", async (req, res) => {
    console.log(req.body);
    console.log("recommend", req.body.title);
    let newRecommend = await new Recommend({ ...req.body }).save();
    res.send(newRecommend);
});

router.delete("/:title", authJWT, async (req, res) => {
    let recommendSong = await Recommend.findOne({ title: req.params.title });
    if (!recommendSong) return res.status(400);
    if (req.user.username === recommendSong.user) {
        deletedRecommendSong = await Recommend.deleteOne({ title: req.params.title });
        return res.send({ message: "OK", deletedRecommendSong });
    }
    return res.status(401);
});

module.exports = router;
