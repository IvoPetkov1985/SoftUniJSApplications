function attachEvents() {
    const baseURL = "http://localhost:3030/jsonstore/messenger";

    const messageArea = document.getElementById("messages");
    const refreshButton = document.getElementById("refresh");
    const submitButton = document.getElementById("submit");
    const authorInput = document.querySelector("#controls input[name=author]");
    const contentInput = document.querySelector("#controls input[name=content]");

    refreshButton.addEventListener("click", loadMessages);
    submitButton.addEventListener("click", submitMessage);

    async function loadMessages() {
        messageArea.value = "";
        const response = await fetch(baseURL);
        const jsonResponse = await response.json();
        const messagesArray = Object.values(jsonResponse);
        const resultString = messagesArray
            .map(m => `${m.author}: ${m.content}`)
            .join("\n");
        messageArea.value = resultString;
    }

    async function submitMessage() {
        const author = authorInput.value;
        const content = contentInput.value;

        if (author === "" || content === "") {
            return;
        }

        const message = { author, content };

        await fetch(baseURL, {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(message)
        });

        authorInput.value = "";
        contentInput.value = "";
    }
}

attachEvents();