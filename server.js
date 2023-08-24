const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/numbers', async (req, res) => {
  const urls = req.query.url;

  if (!urls || !Array.isArray(urls)) {
    return res.status(400).json({ error: 'Invalid or missing "url" parameter(s)"' });
  }

  try {
    const results = await Promise.all(
      urls.map(async url => {
        try {
          const response = await axios.get(url);
          return response.data.numbers;
        } catch (error) {
          return null;
        }
      })
    );

    res.json({ results });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while processing the requests' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
