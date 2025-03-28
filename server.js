const fs = require("fs");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

const DATA_FILE = "codes.json"; // File to store the codes

// Load existing codes from file
let savedCodes = [];
if (fs.existsSync(DATA_FILE)) {
    savedCodes = JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));
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

    const newCode = { title, content };
    savedCodes.push(newCode);

    // Save to JSON file
    fs.writeFileSync(DATA_FILE, JSON.stringify(savedCodes, null, 2));

    res.json({ message: "Code saved successfully!" });
});

// API to delete a code
app.post("/delete-code", (req, res) => {
    const { title } = req.body;
    savedCodes = savedCodes.filter((code) => code.title !== title);

    // Save updated list to file
    fs.writeFileSync(DATA_FILE, JSON.stringify(savedCodes, null, 2));

    res.json({ message: "Code deleted successfully!" });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});


