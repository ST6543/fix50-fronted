const API_URL = "https://fix50.onrender.com";

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
      div.innerHTML = `
        <strong>${s.naam}</strong><br>
        Kenteken: ${s.kenteken}<br>
        Km: ${s.km}<br>
        <button onclick="openEditScooter(${s.id}, '${s.naam}', '${s.kenteken}', ${s.km})">Bewerken</button>
        <button onclick="deleteScooter(${s.id})">Verwijderen</button>
        <hr>
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
  msg.style.color = "red";

  if (!naam || !kenteken || isNaN(km)) {
    msg.textContent = "Alle velden zijn verplicht.";
    return;
  }

  try {
    await apiFetch("/api/scooters", {
      method: "POST",
      body: JSON.stringify({ naam, kenteken, km })
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
