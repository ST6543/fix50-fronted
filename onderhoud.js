// -----------------------------
// 0. API BASIS
// -----------------------------
const API_BASE = "https://fix50.onrender.com";
const token = localStorage.getItem("token");

// -----------------------------
// 1. ONDERHOUDSREGELS (jouw tabel)
// -----------------------------
const MAINTENANCE_RULES = [
  // 2T
  { onderdeel: "Bougie", type: "2T", minKm: 2000, maxKm: 4000, info: "2T vervuilt sneller" },
  { onderdeel: "Luchtfilter reinigen", type: "2T", minKm: 1000, maxKm: 2000, info: "Foam filters vaker reinigen" },
  { onderdeel: "Luchtfilter vervangen", type: "2T", minKm: 6000, maxKm: 8000, info: "" },
  { onderdeel: "V-snaar", type: "2T", minKm: 8000, maxKm: 12000, info: "" },
  { onderdeel: "Rollen", type: "2T", minKm: 4000, maxKm: 6000, info: "Platte rollen = slecht optrekken" },
  { onderdeel: "Koppeling reinigen", type: "2T", minKm: 6000, maxKm: 10000, info: "" },
  { onderdeel: "Koppeling vervangen", type: "2T", minKm: 15000, maxKm: 25000, info: "" },
  { onderdeel: "Carburateur reinigen", type: "2T", minKm: 3000, maxKm: 5000, info: "2T sproeiers vervuilen sneller" },
  { onderdeel: "Zuiger + zuigerveren", type: "2T", minKm: 8000, maxKm: 12000, info: "Bij sportcilinders soms 5000 km" },
  { onderdeel: "Krukaslagers", type: "2T", minKm: 20000, maxKm: 30000, info: "" },
  { onderdeel: "Keerringen", type: "2T", minKm: 10000, maxKm: 20000, info: "" },
  { onderdeel: "Oliepomp afstellen", type: "2T", minKm: 6000, maxKm: 6000, info: "Alleen bij modellen met pomp" },
  { onderdeel: "Uitlaat ontkolen", type: "2T", minKm: 8000, maxKm: 12000, info: "2T uitlaten raken verstopt" },

  // 4T
  { onderdeel: "Motorolie", type: "4T", minKm: 2000, maxKm: 3000, info: "Belangrijkste onderhoud" },
  { onderdeel: "Oliefilter", type: "4T", minKm: 4000, maxKm: 6000, info: "Niet alle 4T hebben filter" },
  { onderdeel: "Bougie", type: "4T", minKm: 4000, maxKm: 6000, info: "4T vervuilt minder snel" },
  { onderdeel: "Klepspeling stellen", type: "4T", minKm: 4000, maxKm: 6000, info: "GY6 gevoelig" },
  { onderdeel: "Luchtfilter reinigen", type: "4T", minKm: 2000, maxKm: 4000, info: "" },
  { onderdeel: "Luchtfilter vervangen", type: "4T", minKm: 8000, maxKm: 10000, info: "" },
  { onderdeel: "V-snaar", type: "4T", minKm: 10000, maxKm: 15000, info: "" },
  { onderdeel: "Rollen", type: "4T", minKm: 6000, maxKm: 8000, info: "" },
  { onderdeel: "Koppeling reinigen", type: "4T", minKm: 8000, maxKm: 12000, info: "" },
  { onderdeel: "Koppeling vervangen", type: "4T", minKm: 20000, maxKm: 30000, info: "" },
  { onderdeel: "Carburateur reinigen", type: "4T", minKm: 5000, maxKm: 8000, info: "" },
  { onderdeel: "Kleppen/nokkenasketting inspecteren", type: "4T", minKm: 10000, maxKm: 15000, info: "" },

  // Universeel
  { onderdeel: "Remblokken", type: "Universeel", minKm: 5000, maxKm: 10000, info: "Afhankelijk van rijstijl" },
  { onderdeel: "Remschijven", type: "Universeel", minKm: 20000, maxKm: 40000, info: "" },
  { onderdeel: "Banden", type: "Universeel", minKm: 8000, maxKm: 15000, info: "Of 4 jaar" },
  { onderdeel: "Accu", type: "Universeel", minKm: null, maxKm: null, info: "2-4 jaar" },
  { onderdeel: "Wiellagers", type: "Universeel", minKm: 15000, maxKm: 25000, info: "" },
  { onderdeel: "Balhoofdlagers", type: "Universeel", minKm: 15000, maxKm: 25000, info: "" },
  { onderdeel: "Schokdempers", type: "Universeel", minKm: 20000, maxKm: 30000, info: "" }
];

// -----------------------------
// 2. BEREKENING (km per DAG)
// -----------------------------
function calcMaintenance({ kmPerDag, huidigeKm, type }) {
  const nu = new Date();
  const kmPerWeek = kmPerDag * 7;

  return MAINTENANCE_RULES
    .filter(r => r.type === type || r.type === "Universeel")
    .map(rule => {
      if (!rule.minKm) {
        return {
          ...rule,
          kmNog: null,
          weken: null,
          datum: "Tijdgebonden",
          status: "OK"
        };
      }

      const volgendeKm = rule.minKm;
      const kmNog = Math.max(0, volgendeKm - huidigeKm);
      const weken = kmNog / kmPerWeek;
      const dagen = Math.round(weken * 7);
      const datum = new Date(nu.getTime() + dagen * 86400000);

      let status;
      if (kmNog <= 0) status = "TE LAAT";
      else if (weken < 2) status = "DRINGEND";
      else if (weken < 6) status = "BINNENKORT";
      else status = "OK";

      return {
        ...rule,
        kmNog,
        weken: Number(weken.toFixed(1)),
        datum: datum.toISOString().slice(0, 10),
        status
      };
    })
    .sort((a, b) => (a.kmNog ?? 0) - (b.kmNog ?? 0));
}

// -----------------------------
// 3. SCOOTERS LADEN UIT BACKEND
// -----------------------------
async function loadScooters() {
  try {
    const res = await fetch(`${API_BASE}/api/scooters`, {
      headers: { "Authorization": `Bearer ${token}` }
    });

    const data = await res.json();
    const select = document.getElementById("scooterSelect");

    select.innerHTML = data.map(s => `
      <option value="${s.kenteken}"
              data-km="${s.kilometerstand || s.km || 0}"
              data-type="${s.type || '4T'}">
        ${s.merk || "Scooter"} – ${s.kenteken}
      </option>
    `).join("");
  } catch (e) {
    console.error(e);
  }
}

// -----------------------------
// 4. BEREKEN + BACKEND AANROEPEN
// -----------------------------
async function berekenOnderhoud() {
  const select = document.getElementById("scooterSelect");
  const option = select.options[select.selectedIndex];

  const scooter = option.value;
  const huidigeKm = Number(option.dataset.km);
  const type = option.dataset.type;
  const kmPerDag = Number(document.getElementById("kmPerDag").value);

  if (!kmPerDag || kmPerDag <= 0) {
    document.getElementById("resultaat").innerHTML = "<p>Vul een geldige waarde in voor km per dag.</p>";
    return;
  }

  try {
    // LOKAAL BEREKENEN (voor direct tonen)
    const adviezenLocal = calcMaintenance({ kmPerDag, huidigeKm, type });

    // BACKEND AANROEPEN (voor mail via Resend)
    const res = await fetch(`${API_BASE}/api/maintenance/calc`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({ scooter, huidigeKm, type, kmPerDag })
    });

    const data = await res.json();
    const adviezen = data.adviezen || adviezenLocal;

    const el = document.getElementById("resultaat");
    el.innerHTML = `
      <h3>Onderhoudsadvies</h3>
      <p>Een e‑mail met dit advies is verzonden.</p>
      ${adviezen.map(a => `
        <div class="card ${a.status.toLowerCase()}">
          <h3>${a.onderdeel}</h3>
          <p>Volgende onderhoud: ${a.minKm ?? "-"} km</p>
          <p>Nog te gaan: ${a.kmNog ?? "-"} km</p>
          <p>Over: ${a.weken ?? "-"} weken</p>
          <p>Datum: ${a.datum}</p>
          <p>Status: ${a.status}</p>
          <p>${a.info}</p>
        </div>
      `).join("")}
    `;
  } catch (e) {
    console.error(e);
    document.getElementById("resultaat").innerHTML =
      "<p>Er ging iets mis bij het ophalen van het onderhoudsadvies.</p>";
  }
}

// -----------------------------
// 5. INIT
// -----------------------------
window.addEventListener("DOMContentLoaded", loadScooters);
