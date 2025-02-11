import { loginUser } from "./auth.js";

document.addEventListener("DOMContentLoaded", () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser && storedUser.username) {
        document.getElementById("username").value = storedUser.username;
    }
});

document.getElementById("login-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (loginUser(username, password)) {
        window.location.href = "index.html"; // ✅ Redirect after successful login
    }
});