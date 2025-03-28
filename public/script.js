// Function to fetch and display saved codes
function fetchCodes() {
    fetch("/get-codes")
        .then(response => response.json())
        .then(codes => {
            const codeList = document.getElementById("code-list");
            codeList.innerHTML = "";
            codes.forEach((code, index) => {
                const codeCard = document.createElement("div");
                codeCard.classList.add("code-card");
                codeCard.innerHTML = `
                    <h3>${code.title}</h3>
                    <pre>${code.content}</pre>
                    <button class="delete-btn" onclick="deleteCode(${index})">Delete</button>
                `;
                codeList.appendChild(codeCard);
            });
        });
}

// Function to submit a new code
function submitCode() {
    const title = document.getElementById("title").value;
    const content = document.getElementById("code").value;

    if (!title || !content) {
        alert("Title and code cannot be empty!");
        return;
    }

    fetch("/submit-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content })
    })
    .then(response => response.json())
    .then(() => {
        document.getElementById("title").value = "";
        document.getElementById("code").value = "";
        fetchCodes(); // Refresh the list after submitting
    });
}

// Function to delete a code
function deleteCode(index) {
    fetch(`/delete-code/${index}`, { method: "DELETE" })
        .then(response => response.json())
        .then(() => {
            fetchCodes(); // Refresh the list after deleting
        });
}

// Load codes when page loads
fetchCodes();

