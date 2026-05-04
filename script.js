const API_URL = "https://fix50-backend.onrender.com";

// LOGIN
async function login() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const res = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
    });

    const data = await res.json();
    document.getElementById("message").innerText = data.message || "Ingelogd!";
}

// REGISTER
async function register() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const res = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
    });

    const data = await res.json();
    document.getElementById("message").innerText = data.message || "Account aangemaakt!";
}

// SCOOTERS LADEN
async function loadScooters() {
    const res = await fetch(`${API_URL}/api/scooters`);
    const data = await res.json();

    const list = document.getElementById("scooter-list");
    list.innerHTML = "";

    data.forEach(s => {
        list.innerHTML += `<div class="card">
            <h3>${s.naam}</h3>
            <p>Kenteken: ${s.kenteken}</p>
            <p>Kilometers: ${s.km}</p>
        </div>`;
    });
}

// ONDERHOUD LADEN
async function loadOnderhoud() {
    const res = await fetch(`${API_URL}/api/onderhoud`);
    const data = await res.json();

    const list = document.getElementById("onderhoud-list");
    list.innerHTML = "";

    data.forEach(o => {
        list.innerHTML += `<div class="card">
            <h3>${o.scooter}</h3>
            <p>Datum: ${o.datum}</p>
            <p>Beschrijving: ${o.beschrijving}</p>
        </div>`;
    });
}
