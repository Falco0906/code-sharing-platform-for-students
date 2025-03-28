let editor;

document.addEventListener("DOMContentLoaded", () => {
    editor = CodeMirror.fromTextArea(document.getElementById("codeInput"), {
        mode: "javascript",
        lineNumbers: true,
        autoCloseBrackets: true,
        theme: "dracula"
    });
    loadCodes();
});

function submitCode() {
    const title = document.getElementById("codeTitle").value;
    const content = editor.getValue();

    if (!title || !content) {
        alert("Please enter both a title and code!");
        return;
    }

    fetch("/submit-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content })
    })
    .then(res => res.json())
    .then(() => {
        document.getElementById("codeTitle").value = "";
        editor.setValue("");
        loadCodes();
    });
}

function loadCodes() {
    fetch("https://your-backend-url.onrender.com/get-codes")
        .then(res => res.json())
        .then(codes => {
            const container = document.getElementById("codeContainer");
            container.innerHTML = "";
            codes.forEach((code, index) => {
                const div = document.createElement("div");
                div.classList.add("code-card");
                div.innerHTML = `
                    <h3>${code.title}</h3>
                    <pre><code>${code.content}</code></pre>
                    <button class="delete-btn" onclick="deleteCode(${index})">Delete</button>
                `;
                container.appendChild(div);
            });
        });
}

function deleteCode(index) {
    fetch(`/delete-code/${index}`, { method: "DELETE" })
        .then(res => res.json())
        .then(() => loadCodes());
}


