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

let savedCodes = []; // In-memory storage (Replace with DB in future)

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
    savedCodes.push({ title, content });
    res.json({ message: "Code saved successfully!" });
});

// API to delete a code by index
app.delete("/delete-code/:index", (req, res) => {
    const index = parseInt(req.params.index);
    if (index >= 0 && index < savedCodes.length) {
        savedCodes.splice(index, 1);
        res.json({ message: "Code deleted successfully!" });
    } else {
        res.status(400).json({ error: "Invalid index" });
    }
});

// Serve `index.html` for all unknown routes
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});


