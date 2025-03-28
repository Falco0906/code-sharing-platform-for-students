const backendUrl = "https://code-sharing-platform-for-students.onrender.com"; // Change to your backend URL

// Load codes on startup
window.onload = () => {
    fetch(`${backendUrl}/get-codes`)
        .then(res => res.json())
        .then(data => displayCodes(data))
        .catch(err => console.error("Error loading codes:", err));
};

// Submit Code
function submitCode() {
    const title = document.getElementById("title").value;
    const content = document.getElementById("codeEditor").value;

    if (!title || !content) {
        alert("Title and code cannot be empty!");
        return;
    }

    fetch(`${backendUrl}/submit-code`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content })
    })
    .then(res => res.json())
    .then(() => location.reload()) // Reload to update list
    .catch(err => console.error("Error submitting code:", err));
}

// Display Codes
function displayCodes(codes) {
    const codeList = document.getElementById("codeList");
    codeList.innerHTML = "";

    codes.forEach(code => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.innerHTML = `<strong>${code.title}</strong><br><pre>${code.content}</pre>`;

        const deleteBtn = document.createElement("button");
        deleteBtn.innerText = "Delete";
        deleteBtn.classList.add("delete-btn");
        deleteBtn.onclick = () => deleteCode(code.title);

        card.appendChild(deleteBtn);
        codeList.appendChild(card);
    });
}

// Delete Code
function deleteCode(title) {
    fetch(`${backendUrl}/delete-code`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title })
    })
    .then(res => res.json())
    .then(() => location.reload()) // Reload after deletion
    .catch(err => console.error("Error deleting code:", err));
}



