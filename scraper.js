const axios = require('axios');
const cheerio = require('cheerio');
const qs = require('qs');

async function saveTubeScraper(url) {
  try {
    // 1. URL එක valid ද කියලා බලමු
    if (!url.includes("youtube.com") && !url.includes("youtu.be")) {
      throw new Error("Invalid YouTube URL");
    }

    // 2. Save-tube එකට යවන data (Payload)
    const data = qs.stringify({
      'url': url,
      'format': 'mp4' // මූලිකව විස්තර ලබා ගැනීමට mp4 ලෙස යවමු
    });

    const config = {
      method: 'post',
      url: 'https://save-tube.com/process', // API endpoint එක
      headers: { 
        'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
      },
      data: data
    };

    const response = await axios(config);
    
    // මෙතනදී සයිට් එකෙන් කෙලින්ම JSON ද නැත්නම් HTML ද එන්නේ කියලා check කරන්න ඕනේ.
    // බොහෝ විට මේ සයිට් එකේ results එන්නේ JSON object එකක් විදිහටයි.
    
    const result = response.data;

    if (!result || result.status !== 'success') {
      throw new Error("Failed to fetch video details");
    }

    return {
      success: true,
      title: result.title,
      duration: result.duration,
      thumbnail: result.thumbnail,
      video_formats: result.video_formats, // MP4 links මෙතන තියෙයි
      audio_formats: result.audio_formats, // MP3 links මෙතන තියෙයි
      source: url
    };

  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
}

module.exports = { saveTubeScraper };
