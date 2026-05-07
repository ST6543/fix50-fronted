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
// 2. BEREKENING
// -----------------------------
function berekenOnderhoud({ kmPerWeek, huidigeKm, type }) {
    const nu = new Date();

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
        .sort((a, b) => a.kmNog - b.kmNog);
}

// -----------------------------
// 3. UI
// -----------------------------
function toonOnderhoud() {
    const kmPerWeek = Number(document.getElementById("kmPerWeek").value);
    const huidigeKm = Number(document.getElementById("huidigeKm").value);
    const type = document.getElementById("type").value;

    const adviezen = berekenOnderhoud({ kmPerWeek, huidigeKm, type });

    const el = document.getElementById("onderhoud-lijst");
    el.innerHTML = "";

    adviezen.forEach(a => {
        el.innerHTML += `
            <div class="card ${a.status.toLowerCase()}">
                <h3>${a.onderdeel}</h3>
                <p>Volgende onderhoud: ${a.minKm ?? "-"} km</p>
                <p>Nog te gaan: ${a.kmNog ?? "-"} km</p>
                <p>Over: ${a.weken ?? "-"} weken</p>
                <p>Datum: ${a.datum}</p>
                <p>Status: ${a.status}</p>
                <p>${a.info}</p>
            </div>
        `;
    });
}
const API_URL = "https://fix50-backend-login-en-registratie.onrender.com";

/* ------------------------------
   INSTELLINGEN OPSLAAN
------------------------------ */
async function saveMaintenanceSettings() {
    const kmPerWeek = Number(document.getElementById("kmPerWeek").value);
    const huidigeKm = Number(document.getElementById("huidigeKm").value);
    const type = document.getElementById("type").value;

    const token = localStorage.getItem("token");

    const res = await fetch(`${API_URL}/api/maintenance/settings`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ kmPerWeek, huidigeKm, type })
    });

    const data = await res.json();

    const msg = document.getElementById("msg");
    if (data.success) {
        msg.style.color = "green";
        msg.innerText = "Instellingen opgeslagen!";
    } else {
        msg.style.color = "red";
        msg.innerText = data.error || "Er ging iets mis.";
    }
}

/* ------------------------------
   ADVIES OPHALEN
------------------------------ */
async function loadMaintenanceAdvice() {
    const token = localStorage.getItem("token");

    const res = await fetch(`${API_URL}/api/maintenance/advice`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    const adviezen = await res.json();

    const list = document.getElementById("onderhoud-lijst");
    list.innerHTML = "";

    adviezen.forEach(a => {
        list.innerHTML += `
            <div class="card ${a.status.toLowerCase()}">
                <h3>${a.onderdeel}</h3>
                <p>Volgende onderhoud: ${a.minKm ?? "-"} km</p>
                <p>Nog te gaan: ${a.kmNog ?? "-"} km</p>
                <p>Over: ${a.weken ?? "-"} weken</p>
                <p>Datum: ${a.datum}</p>
                <p>Status: ${a.status}</p>
                <p>${a.info}</p>
            </div>
        `;
    });
}
