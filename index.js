const express = require("express");
const youtubedl = require("youtube-dl-exec");

const app = express();
const port = process.env.PORT || 3000;

app.get("/gethls", async (req, res) => {
  const youtubeUrl = req.query.url;
  if (!youtubeUrl) {
    return res.status(400).json({ error: "يجب تقديم رابط يوتيوب" });
  }

  try {
    const info = await youtubedl(youtubeUrl, {
      dumpSingleJson: true,
      noCheckCertificate: true,
      noWarnings: true,
      preferFreeFormats: true,
      youtubeSkipDashManifest: true,
      addHeader: ['referer:youtube.com', 'user-agent:Mozilla/5.0']
    });

    const hlsFormat = info.formats.find(f => f.protocol === "m3u8_native" || f.ext === "m3u8");

    if (!hlsFormat) {
      return res.status(404).json({ error: "لم يتم العثور على رابط HLS" });
    }

    res.json({ hls_url: hlsFormat.url });
  } catch (error) {
    console.error("تفاصيل الخطأ:", error);
    res.status(500).json({ error: "حدث خطأ أثناء جلب رابط HLS", details: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
