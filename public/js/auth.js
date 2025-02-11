export function registerUser(username, password) {
    if (!username || !password) {
        alert("Please enter a username and password.");
        return false;
    }

    localStorage.setItem("user", JSON.stringify({ username, password }));
    return true;
}

export function loginUser(username, password) {
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (!storedUser || storedUser.username !== username || storedUser.password !== password) {
        alert("Invalid username or password.");
        return false;
    }

    localStorage.setItem("loggedIn", "true");
    return true;
}

export function logoutUser() {
    localStorage.removeItem("loggedIn");
    window.location.href = "login.html";
}

export function checkAuth() {
    if (!localStorage.getItem("loggedIn")) {
        window.location.href = "login.html";
    }
}
