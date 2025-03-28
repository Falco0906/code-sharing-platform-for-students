const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));

let savedCodes = [];

app.get("/get-codes", (req, res) => res.json(savedCodes));

app.post("/submit-code", (req, res) => {
    const { title, content } = req.body;
    if (!title || !content) return res.status(400).json({ error: "Title and code are required" });

    savedCodes.push({ title, content });
    res.json({ message: "Code saved successfully!" });
});

app.delete("/delete-code/:index", (req, res) => {
    const index = parseInt(req.params.index);
    if (index >= 0 && index < savedCodes.length) {
        savedCodes.splice(index, 1);
        res.json({ message: "Code deleted successfully!" });
    } else {
        res.status(400).json({ error: "Invalid index" });
    }
});

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));


