const axios = require("axios");

const fetchFromDynamicUrl = async (req, res) => {
  try {
    const { url } = req.body;

    if (!url) {
      return res.status(400).json({ error: 'Missing URL in request body' });
    }

    console.log("✅ URL from body:", url);

    const response = await axios.get(url);

    res.status(200).send(response.data);
  } catch (error) {
    console.error("❌ Error fetching URL:", error.message);
    res.status(500).json({ error: 'Failed to fetch file data' });
  }
};

module.exports = {fetchFromDynamicUrl}