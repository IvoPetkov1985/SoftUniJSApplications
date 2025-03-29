async function lockedProfile() {
    const baseURL = "http://localhost:3030/jsonstore/advanced/profiles";

    const mainElement = document.getElementById("main");
    mainElement.innerHTML = "";

    const profilesRequest = await fetch(baseURL);
    const profiles = await profilesRequest.json();
    const profileObjects = Object.values(profiles);

    let counter = 1;

    profileObjects.forEach(pr => {
        const profileDiv = document.createElement("div");
        profileDiv.setAttribute("class", "profile");

        const profileHTML = `
			<img src="./iconProfile2.png" class="userIcon" />
			<label>Lock</label>
			<input type="radio" name="user${counter}Locked" value="lock" checked>
			<label>Unlock</label>
			<input type="radio" name="user${counter}Locked" value="unlock"><br>
			<hr>
			<label>Username</label>
			<input type="text" name="user${counter}Username" value="${pr.username}" disabled readonly />
			<div class="user${counter}Username">
				<hr>
				<label>Email:</label>
				<input type="email" name="user${counter}Email" value="${pr.email}" disabled readonly />
				<label>Age:</label>
				<input type="number" name="user${counter}Age" value="${pr.age}" disabled readonly />
			</div>
			
			<button>Show more</button>`;

        profileDiv.innerHTML = profileHTML;
        mainElement.appendChild(profileDiv);
        counter++;
    });

    const toggleDivs = document.querySelectorAll(".profile div");
    toggleDivs.forEach(div => div.style.display = "none");
    const buttons = document.querySelectorAll(".profile button");

    buttons.forEach(b => {
        b.addEventListener("click", () => {
            const unlockRadioBtn = b.parentElement.querySelector("input[type=radio][value=unlock]");
            const toggleDiv = b.parentElement.querySelector("div");

            if (!unlockRadioBtn.checked) {
                return;
            }

            if (b.textContent === "Show more") {
                toggleDiv.style.display = "block";
                b.textContent = "Hide it";
            } else if (b.textContent === "Hide it") {
                toggleDiv.style.display = "none";
                b.textContent = "Show more";
            }
        });
    })
}