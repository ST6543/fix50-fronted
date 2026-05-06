const API_URL = "https://fix50-backend-login-en-registratie.onrender.com";

/* ---------------- LOGIN ---------------- */
async function login() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

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
        showMessage(data.error);
    }
}

/* ---------------- REGISTER ---------------- */
async function registerUser() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

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
        showMessage(data.error);
    }
}

/* ---------------- SCOOTERS LADEN ---------------- */
async function loadScooters() {
    const token = localStorage.getItem("token");

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

                <button onclick="editScooter(${s.id})">✏ Bewerken</button>
                <button onclick="deleteScooter(${s.id})" class="danger">🗑 Verwijderen</button>
            </div>
        `;
    });
}

/* ---------------- SCOOTER OPSLAAN ---------------- */
async function saveScooter() {
    const naam = document.getElementById("naam").value;
    const kenteken = document.getElementById("kenteken").value;
    const km = document.getElementById("km").value;

    const token = localStorage.getItem("token");

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
        loadScooters();
        showMessage("Scooter opgeslagen!", "green");
    }
}

/* ---------------- SCOOTER VERWIJDEREN ---------------- */
async function deleteScooter(id) {
    const token = localStorage.getItem("token");

    await fetch(`${API_URL}/api/scooters/${id}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` }
    });

    loadScooters();
}

/* ---------------- SCOOTER BEWERKEN ---------------- */
function editScooter(id) {
    document.getElementById("edit-popup").style.display = "block";
    document.getElementById("edit-id").value = id;
}

async function updateScooter() {
    const id = document.getElementById("edit-id").value;
    const naam = document.getElementById("edit-naam").value;
    const kenteken = document.getElementById("edit-kenteken").value;
    const km = document.getElementById("edit-km").value;

    const token = localStorage.getItem("token");

    await fetch(`${API_URL}/api/scooters/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ naam, kenteken, km })
    });

    document.getElementById("edit-popup").style.display = "none";
    loadScooters();
}

/* ---------------- MESSAGE ---------------- */
function showMessage(msg, color = "red") {
    const el = document.getElementById("message");
    if (!el) return;
    el.style.color = color;
    el.innerText = msg;
}
