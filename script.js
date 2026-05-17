const API_URL = "https://fix50.onrender.com";

/* ============================
   HELPERS
============================ */

function getToken() {
  return localStorage.getItem("token");
}

async function apiFetch(path, options = {}) {
  const token = getToken();
  const headers = options.headers || {};

  if (token) headers["Authorization"] = "Bearer " + token;
  if (!headers["Content-Type"] && options.body)
    headers["Content-Type"] = "application/json";

  const res = await fetch(API_URL + path, { ...options, headers });
  const data = await res.json().catch(() => ({}));

  if (!res.ok) throw new Error(data.error || "Er ging iets mis");
  return data;
}

/* ============================
   SCOOTERS
============================ */

async function loadScooters() {
  const list = document.getElementById("scooter-list");
  if (!list) return;

  list.innerHTML = "<p style='color:#ff6600;'>Laden...</p>";

  try {
    const scooters = await apiFetch("/api/scooters");

    if (!scooters.length) {
      list.innerHTML = "<p>Je hebt nog geen scooters.</p>";
      return;
    }

    list.innerHTML = "";
    scooters.forEach(s => {
      const card = document.createElement("div");
      card.className = "scooter-card";

      card.innerHTML = `
        <h3>${s.naam}</h3>
        <p><strong>Kenteken:</strong> ${s.kenteken}</p>
        <p><strong>Kilometers:</strong> ${s.km}</p>
        <p><strong>Type:</strong> ${s.type}</p>

        <div class="card-buttons">
            <button class="edit-btn" onclick="openEditScooter(${s.id}, '${s.naam}', '${s.kenteken}', ${s.km}, '${s.type}')">Bewerken</button>
            <button class="delete-btn" onclick="deleteScooter(${s.id})">Verwijderen</button>
        </div>
      `;

      list.appendChild(card);
    });
  } catch (err) {
    list.innerHTML = `<p style="color:red;">${err.message}</p>`;
  }
}

async function saveScooter() {
  const naam = document.getElementById("naam").value.trim();
  const kenteken = document.getElementById("kenteken").value.trim();
  const km = Number(document.getElementById("km").value);
  const type = document.getElementById("type").value;
  const msg = document.getElementById("message");

  msg.textContent = "";
  msg.style.color = "red";

  if (!naam || !kenteken || isNaN(km) || !type) {
    msg.textContent = "Alle velden zijn verplicht.";
    return;
  }

  try {
    await apiFetch("/api/scooters", {
      method: "POST",
      body: JSON.stringify({ naam, kenteken, km, type })
    });

    msg.style.color = "green";
    msg.textContent = "Scooter opgeslagen.";

    document.getElementById("naam").value = "";
    document.getElementById("kenteken").value = "";
    document.getElementById("km").value = "";

    loadScooters();
  } catch (err) {
    msg.textContent = err.message;
  }
}

function openEditScooter(id, naam, kenteken, km, type) {
  document.getElementById("edit-id").value = id;
  document.getElementById("edit-naam").value = naam;
  document.getElementById("edit-kenteken").value = kenteken;
  document.getElementById("edit-km").value = km;
  document.getElementById("edit-type").value = type;

  document.getElementById("edit-popup").classList.remove("hidden");
}

function closePopup() {
  document.getElementById("edit-popup").classList.add("hidden");
}

async function updateScooter() {
  const id = Number(document.getElementById("edit-id").value);
  const naam = document.getElementById("edit-naam").value.trim();
  const kenteken = document.getElementById("edit-kenteken").value.trim();
  const km = Number(document.getElementById("edit-km").value);
  const type = document.getElementById("edit-type").value;

  if (!naam || !kenteken || isNaN(km) || !type) {
    alert("Alle velden zijn verplicht.");
    return;
  }

  try {
    await apiFetch(`/api/scooters/${id}`, {
      method: "PUT",
      body: JSON.stringify({ naam, kenteken, km, type })
    });

    closePopup();
    loadScooters();
  } catch (err) {
    alert(err.message);
  }
}

async function deleteScooter(id) {
  if (!confirm("Weet je zeker dat je deze scooter wilt verwijderen?")) return;

  try {
    await apiFetch(`/api/scooters/${id}`, { method: "DELETE" });
    loadScooters();
  } catch (err) {
    alert(err.message);
  }
}

/* ============================
   INIT
============================ */

window.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("scooter-list")) loadScooters();
});
