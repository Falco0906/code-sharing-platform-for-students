// Initialize CodeMirror Editor
const editor = CodeMirror.fromTextArea(document.getElementById("codeInput"), {
    mode: "javascript",
    theme: "dracula",
    lineNumbers: true,
    tabSize: 4,
    autoCloseBrackets: true
});

document.getElementById("submitButton").addEventListener("click", () => {
    const title = document.getElementById("codeTitle").value.trim();
    const content = editor.getValue().trim();

    if (!title || !content) {
        alert("Please enter both a title and code!");
        return;
    }

    fetch("/submit-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content })
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        document.getElementById("codeTitle").value = "";
        editor.setValue(""); // Clear the CodeMirror editor
        loadCodes(); // Refresh pinned codes
    })
    .catch(error => console.error("Error:", error));
});

function loadCodes() {
    fetch("/get-codes")
    .then(response => response.json())
    .then(codes => {
        const pinnedCodesDiv = document.getElementById("pinnedCodes");
        pinnedCodesDiv.innerHTML = "";

        codes.forEach(code => {
            const codeBlock = document.createElement("div");
            codeBlock.classList.add("code-block");
            codeBlock.innerHTML = `
                <h3>${code.title}</h3>
                <pre><code>${code.content}</code></pre>
            `;
            pinnedCodesDiv.appendChild(codeBlock);
        });
    })
    .catch(error => console.error("Error:", error));
}

// Load saved codes on page load
document.addEventListener("DOMContentLoaded", loadCodes);

