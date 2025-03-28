const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

// Serve frontend from "public" folder
app.use(express.static(path.join(__dirname, "public")));

// API to get saved codes
let savedCodes = []; // In-memory storage

app.get("/get-codes", (req, res) => {
    res.json(savedCodes);
});

// API to save a new code
app.post("/submit-code", (req, res) => {
    const { title, content } = req.body;
    if (!title || !content) {
        return res.status(400).json({ error: "Title and code are required" });
    }
    savedCodes.push({ title, content });
    res.json({ message: "Code saved successfully!" });
});

// Serve `index.html` for all unknown routes (so frontend always loads)
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

