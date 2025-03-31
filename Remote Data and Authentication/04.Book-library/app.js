window.addEventListener("load", attachEvents);

async function attachEvents() {
    const baseURL = "http://localhost:3030/jsonstore/collections/books";

    const loadBooksBtn = document.getElementById("loadBooks");
    const booksTable = document.querySelector("body table tbody");
    const formElement = document.querySelector("form");

    const titleInput = document.querySelector("input[name=title]");
    const authorInput = document.querySelector("input[name=author]");

    loadBooksBtn.addEventListener("click", loadAllBooks);

    async function loadAllBooks(e) {
        e.preventDefault();
        booksTable.innerHTML = "";

        const request = await fetch(baseURL);
        const requestAsJson = await request.json();
        const booksEntries = Object.entries(requestAsJson);

        for (const [id, bookObj] of booksEntries) {
            const bookTr = document.createElement("tr");

            const titleTd = bookTr.insertCell(0);
            titleTd.textContent = bookObj.title;

            const authorTd = bookTr.insertCell(1);
            authorTd.textContent = bookObj.author;

            const buttonsTd = bookTr.insertCell(2);
            buttonsTd.setAttribute("id", id);

            const editBtn = document.createElement("button");
            editBtn.textContent = "Edit";

            const deleteBtn = document.createElement("button");
            deleteBtn.textContent = "Delete";

            buttonsTd.append(editBtn, deleteBtn);
            booksTable.appendChild(bookTr);

            editBtn.addEventListener("click", editBook);
            deleteBtn.addEventListener("click", deleteBook);
        }
    }

    formElement.addEventListener("submit", createBook);

    async function createBook(e) {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const author = formData.get("author");
        const title = formData.get("title");

        if (author === "" || title === "") {
            return;
        }

        const bookObj = {
            author,
            title
        };

        await fetch(baseURL, {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(bookObj)
        });

        titleInput.value = "";
        authorInput.value = "";
        loadBooksBtn.click();
    }

    async function editBook(e) {
        e.preventDefault();

        const bookId = e.currentTarget.parentElement.id;
        const getBookURL = `${baseURL}/${bookId}`;

        const h3Heading = formElement.querySelector("h3");
        h3Heading.textContent = "EDIT FORM";

        const submitButton = formElement.querySelector("button");
        submitButton.textContent = "Save";

        const bookRequest = await fetch(getBookURL);
        const bookJson = await bookRequest.json();

        authorInput.value = bookJson.author;
        titleInput.value = bookJson.title;

        formElement.addEventListener("submit", async (e) => {
            e.preventDefault();

            const formData = new FormData(e.currentTarget);
            const author = formData.get("author");
            const title = formData.get("title");

            if (author === "" || title === "") {
                return;
            }

            const bookEditObj = {
                title,
                author
            };

            await fetch(getBookURL, {
                method: "PUT",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify(bookEditObj)
            });

            authorInput.value = "";
            titleInput.value = "";

            h3Heading.textContent = "FORM"
            submitButton.textContent = "Submit";
        })

        loadBooksBtn.click();
    }

    async function deleteBook(e) {
        const id = e.currentTarget.parentElement.id;
        const deleteURL = `${baseURL}/${id}`;

        await fetch(deleteURL, {
            method: "DELETE"
        });

        e.target.parentElement.parentElement.remove();
    }

    loadBooksBtn.click();
}