/**
 * Start of Server.Js
 */

const express = require("express");
const axios = require("axios");
const app = express();
//Port 
const port = 5000;

app.get("/users", async (req, res) => {
  try {
    const page = req.query.page || 1;
    const apiUrl = `https://englishapi.pinkvilla.com/app-api/v1/photo-gallery-feed-page/page/${page}`;
    const response = await axios.get(apiUrl);
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching data from the external API:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching data from the API" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

/* End of Server.js */