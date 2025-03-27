function attachEvents() {
    const baseURL = "http://localhost:3030/jsonstore/phonebook";

    const phonebookUl = document.getElementById("phonebook");
    const loadButton = document.getElementById("btnLoad");
    const personInput = document.getElementById("person");
    const phoneInput = document.getElementById("phone");
    const createButton = document.getElementById("btnCreate");

    createButton.addEventListener("click", createContact);

    loadButton.addEventListener("click", async () => {
        phonebookUl.innerHTML = "";
        const loadResponse = await fetch(baseURL);
        const responeAsJson = await loadResponse.json();
        const contactsArray = Object.values(responeAsJson);

        contactsArray.forEach(contactObj => {
            const liEl = document.createElement("li");
            liEl.textContent = `${contactObj.person}: ${contactObj.phone}`;

            const buttonEl = document.createElement("button");
            buttonEl.textContent = "Delete";
            buttonEl.setAttribute("id", contactObj._id);

            liEl.appendChild(buttonEl);
            phonebookUl.appendChild(liEl);

            buttonEl.addEventListener("click", (e) => {
                const id = e.currentTarget.id;
                const delURL = `${baseURL}/${id}`;

                fetch(delURL, {
                    method: "DELETE"
                });

                e.currentTarget.parentElement.remove();
            });
        });
    });

    async function createContact() {
        const person = personInput.value;
        const phone = phoneInput.value;

        if (person === "" || phone === "") {
            return;
        }

        const contact = { person, phone };

        await fetch(baseURL, {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(contact)
        });

        personInput.value = "";
        phoneInput.value = "";
        loadButton.click();
    }
}

attachEvents();