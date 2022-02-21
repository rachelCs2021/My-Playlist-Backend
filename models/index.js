
const mongoose = require("mongoose");
const Song = require("./song.js");
const User = require("./User.js");
const PlayList = require("./PlayList.js");

const connectDB = async () => {
    const mongoUrl = process.env.MONGO_URL;
    return await mongoose.connect(mongoUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
};

const models = { Song, User, PlayList };
module.exports = { connectDB, models };