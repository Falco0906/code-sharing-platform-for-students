const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_FILE = "codes.json";

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

let savedCodes = [];

// Load existing data
if (fs.existsSync(DATA_FILE)) {
    savedCodes = JSON.parse(fs.readFileSync(DATA_FILE, "utf-8"));
}

// Get saved codes
app.get("/get-codes", (req, res) => {
    res.json(savedCodes);
});

// Submit new code
app.post("/submit-code", (req, res) => {
    const { title, content } = req.body;
    if (!title || !content) {
        return res.status(400).json({ error: "Title and code are required" });
    }

    savedCodes.push({ title, content });
    fs.writeFileSync(DATA_FILE, JSON.stringify(savedCodes, null, 2));

    res.json({ message: "Code saved successfully!" });
});

// Delete a code
app.delete("/delete-code/:index", (req, res) => {
    const index = parseInt(req.params.index);
    if (index >= 0 && index < savedCodes.length) {
        savedCodes.splice(index, 1);
        fs.writeFileSync(DATA_FILE, JSON.stringify(savedCodes, null, 2));
        res.json({ message: "Code deleted successfully!" });
    } else {
        res.status(400).json({ error: "Invalid index" });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});


