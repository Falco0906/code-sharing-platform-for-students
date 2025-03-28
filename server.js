const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs");

const app = express();
const PORT = 3000;
const FILE_PATH = "codes.json"; // File to store saved codes

app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));

// Load saved codes from file (if exists)
let savedCodes = [];
if (fs.existsSync(FILE_PATH)) {
    savedCodes = JSON.parse(fs.readFileSync(FILE_PATH, "utf8"));
}

// API to get saved codes
app.get("/get-codes", (req, res) => {
    res.json(savedCodes);
});

// API to save a new code
app.post("/submit-code", (req, res) => {
    const { title, content } = req.body;
    if (!title || !content) {
        return res.status(400).json({ error: "Title and code are required" });
    }

    // Save the new code
    savedCodes.push({ title, content });

    // Write updated codes to file
    fs.writeFileSync(FILE_PATH, JSON.stringify(savedCodes, null, 2));

    res.json({ message: "Code saved successfully!" });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

