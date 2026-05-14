const express = require("express");
const cors = require("cors");
const { mediafireScraper } = require("./scraper");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/youtube", async (req, res) => {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ error: "URL parameter required" });
  }

  try {
    const result = await mediafireScraper(url);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`DTZ Dula API running on port ${PORT}`);
});

