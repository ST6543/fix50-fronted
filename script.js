// JUISTE backend URL
const API_URL = "https://fix50-backend-login-en-registratie.onrender.com";

// ---------------------------
// LOGIN
// ---------------------------
async function login() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (!email || !password) {
        showMessage("Vul alle velden in.");
        return;
    }

    try {
        const res = await fetch(`${API_URL}/api/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });

        const data = await res.json();
        console.log("Login response:", data);

        if (data.token) {
            localStorage.setItem("token", data.token);
            window.location.href = "scooter.html";
        } else {
            showMessage(data.error || "Onjuiste gegevens.");
        }
    } catch (err) {
        console.error(err);
        showMessage("Server niet bereikbaar.");
    }
}

// ---------------------------
// REGISTER
// ---------------------------
async function registerUser() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (!email || !password) {
        showMessage("Vul alle velden in.");
        return;
    }

    try {
        const res = await fetch(`${API_URL}/api/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });

        const data = await res.json();
        console.log("Register response:", data);

        if (data.success) {
            showMessage("Account aangemaakt!", "green");
            setTimeout(() => window.location.href = "login.html", 1000);
        } else {
            showMessage(data.error || "Er ging iets mis.");
        }
    } catch (err) {
        console.error(err);
        showMessage("Server niet bereikbaar.");
    }
}

// ---------------------------
// SCOOTERS LADEN
// ---------------------------
async function loadScooters() {
    const token = localStorage.getItem("token");

    if (!token) {
        showMessage("Je bent niet ingelogd.");
        return;
    }

    try {
        const res = await fetch(`${API_URL}/api/scooters`, {
            headers: { "Authorization": `Bearer ${token}` }
        });

        const data = await res.json();
        console.log("Scooters:", data);

        const list = document.getElementById("scooter-list");
        list.innerHTML = "";

        data.forEach(s => {
            list.innerHTML += `
                <div class="card">
                    <h3>${s.naam}</h3>
                    <p>Kenteken: ${s.kenteken}</p>
                    <p>Kilometers: ${s.km}</p>
                </div>`;
        });
    } catch (err) {
        console.error(err);
        showMessage("Kan scooters niet laden.");
    }
}

// ---------------------------
// ONDERHOUD LADEN
// ---------------------------
async function loadOnderhoud() {
    const token = localStorage.getItem("token");

    if (!token) {
        showMessage("Je bent niet ingelogd.");
        return;
    }

    try {
        const res = await fetch(`${API_URL}/api/onderhoud`, {
            headers: { "Authorization": `Bearer ${token}` }
        });

        const data = await res.json();
        console.log("Onderhoud:", data);

        const list = document.getElementById("onderhoud-list");
        list.innerHTML = "";

        data.forEach(o => {
            list.innerHTML += `
                <div class="card">
                    <h3>${o.scooter}</h3>
                    <p>Datum: ${o.datum}</p>
                    <p>Beschrijving: ${o.beschrijving}</p>
                </div>`;
        });
    } catch (err) {
        console.error(err);
        showMessage("Kan onderhoud niet laden.");
    }
}

// ---------------------------
// HULPFUNCTIE
// ---------------------------
function showMessage(msg, color = "red") {
    const el = document.getElementById("message");
    if (!el) return;
    el.style.color = color;
    el.innerText = msg;
}
