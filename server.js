//Imports
require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const bodyParser = require("body-parser");
const { connectDB } = require("./models/index.js");
const { songsRoute, usersRoute, playListRoute, searchRoute, recommendSongRoute } = require("./routes/router.js");

//Uses
const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));


//Connect the Database
connectDB().then(() => {
    console.log("Connected to DB successfully");
});

//Listen
const port = 4001;
// const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

//Use routes
app.use("/songs", songsRoute);
app.use("/users", usersRoute);
app.use("/search", searchRoute);
app.use("/playlist", playListRoute);
app.use("/recommendSong", recommendSongRoute);
