
const express = require("express")
const axios = require("axios")
const { JSDOM } = require("jsdom")
const router = express.Router();


const getKeySafe = (getFn) => {
    try {
        return getFn();
    } catch {
        return null;
    }
};

router.get("/", async (req, res) => {
    console.log("search song");
    const { q } = req.query;
    console.log(q);
    let ytInitialData = null;
    const { data } = await axios.get(
        encodeURI(`https://www.youtube.com/results?search_query=${q}`)
    );
    const doc = new JSDOM(data).window.document;
    const scripts = doc.querySelectorAll("script");
    scripts.forEach((s) => {
        if (s.textContent.includes("var ytInitialData")) {
            ytInitialData = eval(s.textContent.substring(4));
        }
    });
    const { contents } = getKeySafe(
        () =>
            ytInitialData.contents.twoColumnSearchResultsRenderer.primaryContents
                .sectionListRenderer.contents[0].itemSectionRenderer
    );
    res.send(
        contents
            .filter(
                (v) =>
                    "videoRenderer" in v &&
                    getKeySafe(
                        () =>
                            v.videoRenderer.ownerBadges[0].metadataBadgeRenderer.icon.iconType
                    ) === "OFFICIAL_ARTIST_BADGE"
            )
            .map((v) => {
                const vid = v.videoRenderer;
                return {
                    id: vid.videoId,
                    title: vid.title.runs[0].text,
                    artist: vid.ownerText.runs[0].text,
                    img: vid.thumbnail.thumbnails[0],
                };
            })
    );
});

module.exports = router;