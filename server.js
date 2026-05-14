const express = require("express");
const cors = require("cors");
const { saveTubeScraper } = require("./scraper"); 

const app = express();

app.use(cors());
app.use(express.json());

// YouTube Scraper Endpoint
app.get("/api/youtube", async (req, res) => {
    const { url } = req.query;

    if (!url) {
        return res.status(400).json({ 
            success: false, 
            error: "YouTube URL eka missing (URL parameter is required)" 
        });
    }

    try {
        const result = await saveTubeScraper(url);
        
        if (result.success) {
            res.json(result);
        } else {
            res.status(500).json(result);
        }
    } catch (err) {
        res.status(500).json({ 
            success: false, 
            error: "Internal Server Error: " + err.message 
        });
    }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`DTZ Dula API running on port ${PORT}`);
    console.log(`Test link: http://localhost:${PORT}/api/youtube?url=YOUTUBE_URL_HERE`);
});
