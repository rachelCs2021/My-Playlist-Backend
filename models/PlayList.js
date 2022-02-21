
const mongoose = require("mongoose");

const playListSchema = new mongoose.Schema(
    {
        createdBy: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: "User",
            // required: true,
        },
        songs: {
            type: [mongoose.SchemaTypes.ObjectId],
            ref: "Song",
            // required: true,
        }
    },
    { timestamps: true }
);

const PlayList = mongoose.model("PlayList", playListSchema);
module.exports = PlayList;