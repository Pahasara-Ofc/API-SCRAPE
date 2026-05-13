const axios = require('axios');
const cheerio = require('cheerio');
const qs = require('qs');

async function saveTubeScraper(url) {
  try {
    
    if (!url.includes("youtube.com") && !url.includes("youtu.be")) {
      throw new Error("Invalid YouTube URL");
    }
    
    const data = qs.stringify({
      'url': url,
      'format': 'mp4'
    });

    const config = {
      method: 'post',
      url: 'https://save-tube.com/process', // API 
      headers: { 
        'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
      },
      data: data
    };

    const response = await axios(config);
    const result = response.data;

    if (!result || result.status !== 'success') {
      throw new Error("Failed to fetch video details");
    }

    return {
      success: true,
      title: result.title,
      duration: result.duration,
      thumbnail: result.thumbnail,
      video_formats: result.video_formats, // MP4 links 
      audio_formats: result.audio_formats, // MP3 links 
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
