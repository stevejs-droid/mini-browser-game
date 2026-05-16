const express = require("express");
const fs = require("fs");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const FILE = "scores.json";

// Ensure file exists
if (!fs.existsSync(FILE)) {
    fs.writeFileSync(FILE, "[]");
}

// Get leaderboard
app.get("/leaderboard", (req, res) => {
    const data = JSON.parse(fs.readFileSync(FILE));
    res.json(data.sort((a, b) => b.score - a.score).slice(0, 10));
});

// Save score
app.post("/score", (req, res) => {
    const { name, score } = req.body;

    const data = JSON.parse(fs.readFileSync(FILE));
    data.push({ name, score });

    fs.writeFileSync(FILE, JSON.stringify(data, null, 2));
    res.send("Score saved");
});

app.listen(3000, () => console.log("✅ Server running on http://localhost:3000"));