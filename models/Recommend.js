
const mongoose = require("mongoose");

const recommendSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        artist: { type: String, required: true },
        url: { type: String, required: true },
    });

const Recomend = mongoose.model("recommend", recommendSchema);
module.exports = Recomend;


