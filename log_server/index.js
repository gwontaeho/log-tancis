const express = require("express");
const axios = require("axios");
const https = require("https");
var cors = require("cors");

const app = express();
const PORT = 4000;

app.use(cors());

const username = "tancisadmin";
const apiToken = "113ce39804adfcd9ac18f955e6755d0653";
const authString = `${username}:${apiToken}`;
const authBase64 = Buffer.from(authString).toString("base64");

app.get("/jenkins", async (req, res) => {
  const { team, name, number } = req.query;
  try {
    const { data } = await axios.get(
      `https://jenkins.singlewindow.info:30143/${
        team ? `job/${team}/` : ""
      }job/${name}/${number}/consoleText`,
      {
        headers: { Authorization: `Basic ${authBase64}` },
        httpsAgent: new https.Agent({ rejectUnauthorized: false }),
      }
    );
    res.send(data);
  } catch (error) {
    res.status(500).send("Error fetching data");
  }
});

app.listen(PORT, () => {
  console.log(`Proxy server is running on http://localhost:${PORT}`);
});
