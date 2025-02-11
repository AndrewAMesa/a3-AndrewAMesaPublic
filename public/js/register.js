import { registerUser } from "./auth.js";

document.getElementById("register-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (registerUser(username, password)) {
        window.location.href = "login.html";
    }
});