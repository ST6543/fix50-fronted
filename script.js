// PAS DIT AAN NAAR JE ECHTE BACKEND-URL
const API_URL = "https://fix50.onrender.com";

// Helper: token ophalen
function getToken() {
  return localStorage.getItem("token");
}

// Helper: standaard fetch met auth
async function apiFetch(path, options = {}) {
  const token = getToken();
  const headers = options.headers || {};
  if (token) {
    headers["Authorization"] = "Bearer " + token;
  }
  if (!headers["Content-Type"] && options.body) {
    headers["Content-Type"] = "application/json";
  }

  const res = await fetch(API_URL + path, { ...options, headers });
  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(data.error || "Er ging iets mis");
  }
  return data;
}

/* ------------------------------
   SCOOTERS
------------------------------ */

async function loadScooters() {
  const list = document.getElementById("scooter-list");
  if (!list) return;

  list.innerHTML = "Laden...";

  try {
    const scooters = await apiFetch("/api/scooters");
    if (!scooters.length) {
      list.innerHTML = "<p>Je hebt nog geen scooters.</p>";
      return;
    }

    list.innerHTML = "";
    scooters.forEach(s => {
      const div = document.createElement("div");
      div.className = "card";
      div.innerHTML = `
        <h3>${s.naam}</h3>
        <p>Kenteken: ${s.kenteken}</p>
        <p>Kilometers: ${s.km}</p>
        <button onclick="openEditScooter(${s.id}, '${s.naam}', '${s.kenteken}', ${s.km})">Bewerken</button>
        <button class="danger" onclick="deleteScooter(${s.id})">Verwijderen</button>
      `;
      list.appendChild(div);
    });
  } catch (err) {
    list.innerHTML = `<p style="color:red;">${err.message}</p>`;
  }
}

async function saveScooter() {
  const naam = document.getElementById("naam").value.trim();
  const kenteken = document.getElementById("kenteken").value.trim();
  const km = Number(document.getElementById("km").value);
  const msg = document.getElementById("message");

  msg.textContent = "";

  if (!naam || !kenteken || !km) {
    msg.textContent = "Alle velden zijn verplicht.";
    return;
  }

  try {
    await apiFetch("/api/scooters", {
      method: "POST",
      body: JSON.stringify({ naam, kenteken, km })
    });
    msg.style.color = "lime";
    msg.textContent = "Scooter opgeslagen.";
    document.getElementById("naam").value = "";
    document.getElementById("kenteken").value = "";
    document.getElementById("km").value = "";
    loadScooters();
  } catch (err) {
    msg.style.color = "red";
    msg.textContent = err.message;
  }
}

function openEditScooter(id, naam, kenteken, km) {
  document.getElementById("edit-id").value = id;
  document.getElementById("edit-naam").value = naam;
  document.getElementById("edit-kenteken").value = kenteken;
  document.getElementById("edit-km").value = km;
  document.getElementById("edit-popup").style.display = "block";
}

async function updateScooter() {
  const id = Number(document.getElementById("edit-id").value);
  const naam = document.getElementById("edit-naam").value.trim();
  const kenteken = document.getElementById("edit-kenteken").value.trim();
  const km = Number(document.getElementById("edit-km").value);

  try {
    await apiFetch(`/api/scooters/${id}`, {
      method: "PUT",
      body: JSON.stringify({ naam, kenteken, km })
    });
    document.getElementById("edit-popup").style.display = "none";
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

/* ------------------------------
   ONDERHOUD
------------------------------ */

async function saveMaintenanceSettings() {
  const kmPerWeek = Number(document.getElementById("kmPerWeek").value);
  const huidigeKm = Number(document.getElementById("huidigeKm").value);
  const type = document.querySelector('input[name="type"]:checked')?.value;
  const msg = document.getElementById("maint-message");

  msg.textContent = "";

  if (!kmPerWeek || !huidigeKm || !type) {
    msg.textContent = "Alle velden zijn verplicht.";
    msg.style.color = "red";
    return;
  }

  try {
    await apiFetch("/api/maintenance/settings", {
      method: "POST",
      body: JSON.stringify({ kmPerWeek, huidigeKm, type })
    });
    msg.style.color = "lime";
    msg.textContent = "Instellingen opgeslagen.";
    loadMaintenanceAdvice();
  } catch (err) {
    msg.style.color = "red";
    msg.textContent = err.message;
  }
}

async function loadMaintenanceAdvice() {
  const container = document.getElementById("maintenance-list");
  if (!container) return;

  container.innerHTML = "Laden...";

  try {
    const adviezen = await apiFetch("/api/maintenance/advice");

    if (!adviezen.length) {
      container.innerHTML = "<p>Geen adviezen gevonden.</p>";
      return;
    }

    container.innerHTML = "";
    adviezen.forEach(a => {
      const div = document.createElement("div");
      div.className = "card";
      div.innerHTML = `
        <h3>${a.onderdeel}</h3>
        <p>Type: ${a.type}</p>
        <p>Status: ${a.status}</p>
        <p>Datum: ${a.datum}</p>
        <p>Nog: ${a.kmNog ?? "-"} km</p>
        ${a.info ? `<p>Info: ${a.info}</p>` : ""}
      `;
      container.appendChild(div);
    });
  } catch (err) {
    container.innerHTML = `<p style="color:red;">${err.message}</p>`;
  }
}
