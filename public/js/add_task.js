const BASE_URL = window.location.origin;

const submit = async function(event) {
    event.preventDefault();

    const taskInput = document.querySelector("#task"),
        priorityInput = document.querySelector("#priority"),
        deadlineDateInput = document.querySelector("#deadline_date");

    const json = {
        task: taskInput.value,
        priority: priorityInput.value,
        deadline_date: deadlineDateInput.value
    };

    const user = JSON.parse(localStorage.getItem("user"));

    await fetch(`${BASE_URL}/data`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "x-username": user.username
        },
        body: JSON.stringify(json)
    });

    window.location.href = "index.html";
};

window.addEventListener("DOMContentLoaded", function() {
    document.querySelector("button").onclick = submit;
});
