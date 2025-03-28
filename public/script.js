const backendUrl = "https://code-sharing-platform-for-students.onrender.com"; // Update this

const codeEditor = CodeMirror.fromTextArea(document.getElementById("code"), {
    mode: "python",
    theme: "dracula",
    lineNumbers: true,
    autoCloseBrackets: true,
    matchBrackets: true,
    indentUnit: 4,
    tabSize: 4,
});

document.getElementById("submit-btn").addEventListener("click", () => {
    const title = document.getElementById("title").value.trim();
    const content = codeEditor.getValue().trim();

    if (!title || !content) {
        alert("Title and Code cannot be empty!");
        return;
    }

    fetch(`${backendUrl}/submit-code`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content }),
    })
    .then(response => response.json())
    .then(() => {
        fetchCodes();
        document.getElementById("title").value = "";
        codeEditor.setValue("");
    })
    .catch(error => console.error("Error:", error));
});

function fetchCodes() {
    fetch(`${backendUrl}/get-codes`)
        .then(response => response.json())
        .then(data => {
            const codeList = document.getElementById("code-list");
            codeList.innerHTML = "";
            data.forEach((code, index) => {
                const codeCard = document.createElement("div");
                codeCard.className = "code-card";
                codeCard.innerHTML = `
                    <h3>${code.title}</h3>
                    <pre><code>${code.content}</code></pre>
                    <button class="delete-btn" onclick="deleteCode(${index})">Delete</button>
                `;
                codeList.appendChild(codeCard);
            });
        });
}

function deleteCode(index) {
    fetch(`${backendUrl}/delete-code/${index}`, { method: "DELETE" })
        .then(response => response.json())
        .then(() => fetchCodes())
        .catch(error => console.error("Error:", error));
}

fetchCodes();




