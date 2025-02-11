const BASE_URL = window.location.origin;

async function loadTaskDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const taskId = urlParams.get("taskId");

    if (taskId) {
        const user = JSON.parse(localStorage.getItem("user"));
        const response = await fetch(`${BASE_URL}/api/data`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "x-username": user.username
            }
        });
        const tasks = await response.json();
        const task = tasks.find(t => t._id === taskId);

        if (task) {
            document.getElementById("task").value = task.task;
            document.getElementById("deadline_date").value = task.deadline_date;
        }
    }
}

async function handleUpdate(event) {
    event.preventDefault();

    const updatedTask = document.getElementById("task").value;
    const updatedDeadline = document.getElementById("deadline_date").value;
    const urlParams = new URLSearchParams(window.location.search);
    const taskId = urlParams.get("taskId");

    if (taskId) {
        await fetch(`${BASE_URL}/api/update/${taskId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ task: updatedTask, deadline_date: updatedDeadline })
        });

        window.location.href = "/";
    }
}

window.addEventListener("DOMContentLoaded", function () {
    loadTaskDetails();
    document.getElementById("update-form").addEventListener("submit", handleUpdate);
});
