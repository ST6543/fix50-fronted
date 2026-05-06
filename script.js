const API_URL = "https://fix50-backend-login-en-registratie.onrender.com";

// LOGIN
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

        if (data.token) {
            localStorage.setItem("token", data.token);
            window.location.href = "scooter.html";
        } else {
            showMessage(data.error || "Onjuiste gegevens.");
        }
    } catch {
        showMessage("Server niet bereikbaar.");
    }
}

// REGISTER (DIRECT INLOGGEN)
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

        if (data.token) {
            localStorage.setItem("token", data.token);
            window.location.href = "scooter.html";
        } else {
            showMessage(data.error || "Er ging iets mis.");
        }
    } catch {
        showMessage("Server niet bereikbaar.");
    }
}

// SCOOTERS LADEN
async function loadScooters() {
    const token = localStorage.getItem("token");
    if (!token) return showMessage("Je bent niet ingelogd.");

    const res = await fetch(`${API_URL}/api/scooters`, {
        headers: { "Authorization": `Bearer ${token}` }
    });

    const data = await res.json();

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
}

// SCOOTER OPSLAAN
async function saveScooter() {
    const naam = document.getElementById("naam").value;
    const kenteken = document.getElementById("kenteken").value;
    const km = document.getElementById("km").value;

    const token = localStorage.getItem("token");
    if (!token) return showMessage("Niet ingelogd.");

    const res = await fetch(`${API_URL}/api/scooters`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ naam, kenteken, km })
    });

    const data = await res.json();

    if (data.success) {
        showMessage("Scooter opgeslagen!", "green");
        loadScooters();
    } else {
        showMessage(data.error);
    }
}

// HULPFUNCTIE
function showMessage(msg, color = "red") {
    const el = document.getElementById("message");
    if (!el) return;
    el.style.color = color;
    el.innerText = msg;
}
