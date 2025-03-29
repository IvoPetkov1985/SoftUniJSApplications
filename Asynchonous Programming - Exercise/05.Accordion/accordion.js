window.addEventListener("load", solution);

async function solution() {
    const baseURL = "http://localhost:3030/jsonstore/advanced/articles/list";

    const mainSection = document.getElementById("main");
    mainSection.innerHTML = "";

    const mainRequest = await fetch(baseURL);
    const requestAsJson = await mainRequest.json();

    for (const obj of requestAsJson) {
        const accDiv = document.createElement("div");
        accDiv.setAttribute("class", "accordion");

        const headDiv = document.createElement("div");
        headDiv.setAttribute("class", "head");
        const spanEl = document.createElement("span");
        spanEl.textContent = obj.title;
        const buttonEl = document.createElement("button");
        buttonEl.setAttribute("id", obj._id);
        buttonEl.textContent = "More";
        headDiv.append(spanEl, buttonEl);

        const extraDiv = document.createElement("div");
        extraDiv.setAttribute("class", "extra");
        const pEl = document.createElement("p");
        extraDiv.appendChild(pEl);

        accDiv.append(headDiv, extraDiv);
        mainSection.appendChild(accDiv);
    }

    const buttonElements = document.querySelectorAll(".head button");

    buttonElements.forEach(b => {
        b.addEventListener("click", async () => {
            const extraInfoURL = "http://localhost:3030/jsonstore/advanced/articles/details/";
            const extraDivElement = b.parentElement.parentElement.querySelector(".extra");
            const parElement = extraDivElement.querySelector("p");

            const extraRequest = await fetch(extraInfoURL + b.id);
            const requestAsObj = await extraRequest.json();

            if (b.textContent === "More") {
                extraDivElement.style.display = "block";
                parElement.textContent = requestAsObj.content;
                b.textContent = "Less";
            } else if (b.textContent === "Less") {
                extraDivElement.style.display = "none";
                parElement.textContent = "";
                b.textContent = "More";
            }
        });
    });
}