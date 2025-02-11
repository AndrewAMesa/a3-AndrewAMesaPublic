import { checkAuth, logoutUser } from "./auth.js";

const BASE_URL = window.location.origin;
const priorityOrder = { High: 1, Medium: 2, Low: 3 };

const loadTable = async function () {
    const user = JSON.parse(localStorage.getItem("user"));
    const response = await fetch(`${BASE_URL}/api/data`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "x-username": user.username
        }
    });
    const data = await response.json();

    const tableBody = document.querySelector("#data-table");
    tableBody.innerHTML = "";

    // Sort by priority (High -> Medium -> Low)
    data.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);

    data.forEach((task) => {
        const tr = document.createElement("tr");

        tr.innerHTML = `
        <td class="px-6 py-3">${task.task}</td>
        <td class="px-6 py-3">${task.priority}</td>
        <td class="px-6 py-3">${formatDate(task.creation_date)}</td>
        <td class="px-6 py-3">${formatDate(task.deadline_date)}</td>
        <td class="px-6 py-3">${task.planned_duration} days</td>
        <td class="px-6 py-3 space-x-2">
            <button class="update-btn bg-green-500 text-white px-4 py-2 rounded-md shadow-md transition
                           hover:bg-green-600 hover:shadow-lg" data-id="${task._id}">
                Update
            </button>
            <button class="delete-btn bg-red-500 text-white px-4 py-2 rounded-md shadow-md transition
                           hover:bg-red-600 hover:shadow-lg" data-id="${task._id}">
                Delete
            </button>
        </td>`;

        tableBody.append(tr);
    });

    attachEventListeners();
};

const attachEventListeners = () => {
    document.querySelectorAll(".delete-btn").forEach(button => {
        button.addEventListener("click", async function () {
            const taskId = this.getAttribute("data-id");

            await fetch(`${BASE_URL}/api/data/${taskId}`, { method: "DELETE" });

            loadTable();
        });
    });

    document.querySelectorAll(".update-btn").forEach(button => {
        button.addEventListener("click", function () {
            const taskId = this.getAttribute("data-id");
            window.location.href = `/update_task.html?taskId=${taskId}`;
        });
    });
};

const formatDate = (dateString) => {
    const date = new Date(dateString + "T00:00:00");
    return date.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: '2-digit' });
};

window.addEventListener("DOMContentLoaded", async () => {
    checkAuth();

    const user = JSON.parse(localStorage.getItem("user"));

    if (user && user.username) {
        document.getElementById("welcome-text").textContent = `Focusly: Welcome, ${user.username}`;
    }

    document.getElementById("logout-btn").addEventListener("click", logoutUser);

    await loadTable();
});