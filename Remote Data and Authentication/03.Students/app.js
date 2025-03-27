window.addEventListener("load", attachEvents);

async function attachEvents() {
    const baseURL = "http://localhost:3030/jsonstore/collections/students";

    const tableBody = document.querySelector("#results tbody");
    const inputFields = document.querySelectorAll(".inputs input");
    const form = document.getElementById("form");

    form.addEventListener("submit", createStudentEntry);

    async function loadStudents() {
        tableBody.innerHTML = "";

        const response = await fetch(baseURL);
        const studentsResponse = await response.json();
        const studentsObjects = Object.values(studentsResponse);
        studentsObjects.forEach(studentObj => {
            const studentTr = document.createElement("tr");

            const firstNameCell = studentTr.insertCell(0);
            firstNameCell.textContent = studentObj.firstName;

            const lastNameCell = studentTr.insertCell(1);
            lastNameCell.textContent = studentObj.lastName;

            const facNumberCell = studentTr.insertCell(2);
            facNumberCell.textContent = studentObj.facultyNumber;

            const gradeCell = studentTr.insertCell(3);
            gradeCell.textContent = studentObj.grade;
            tableBody.appendChild(studentTr);
        });
    }

    async function createStudentEntry(e) {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const firstName = formData.get("firstName");
        const lastName = formData.get("lastName");
        const facultyNumber = formData.get("facultyNumber");
        const grade = formData.get("grade");

        if (firstName === "" || lastName === "" || facultyNumber === "" || grade === "") {
            return;
        }

        const student = { firstName, lastName, facultyNumber, grade };

        await fetch(baseURL, {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(student)
        });

        inputFields.forEach(input => input.value = "");
        loadStudents();
    }

    loadStudents();
}